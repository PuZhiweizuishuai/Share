import {abcRender} from "../markdown/abcRender";
import {chartRender} from "../markdown/chartRender";
import {codeRender} from "../markdown/codeRender";
import {flowchartRender} from "../markdown/flowchartRender";
import {getMarkdown} from "../markdown/getMarkdown";
import {graphvizRender} from "../markdown/graphvizRender";
import {highlightRender} from "../markdown/highlightRender";
import {mathRender} from "../markdown/mathRender";
import {mediaRender} from "../markdown/mediaRender";
import {mermaidRender} from "../markdown/mermaidRender";
import {SMILESRender} from "../markdown/SMILESRender";
import {markmapRender} from "../markdown/markmapRender";
import {mindmapRender} from "../markdown/mindmapRender";
import {plantumlRender} from "../markdown/plantumlRender";
import {getEventName} from "../util/compatibility";
import {hasClosestByClassName, hasClosestByMatchTag} from "../util/hasClosest";
import {hasClosestByTag} from "../util/hasClosestByHeadings";
import {setSelectionFocus} from "../util/selection";
import {previewImage} from "./image";

export class Preview {
    public element: HTMLElement;
    public previewElement: HTMLElement;
    private mdTimeoutId: number;

    constructor(vditor: IVditor) {
        this.element = document.createElement("div");
        this.element.className = `vditor-preview`;
        this.previewElement = document.createElement("div");
        this.previewElement.className = "vditor-reset";
        if (vditor.options.classes.preview) {
            this.previewElement.classList.add(vditor.options.classes.preview);
        }
        this.previewElement.style.maxWidth = vditor.options.preview.maxWidth + "px";
        this.previewElement.addEventListener("copy", (event: ClipboardEvent & { target: HTMLElement }) => {
            if (event.target.tagName === "TEXTAREA") {
                // https://github.com/Vanessa219/vditor/issues/901
                return;
            }
            const tempElement = document.createElement("div");
            tempElement.className = "vditor-reset";
            tempElement.appendChild(getSelection().getRangeAt(0).cloneContents());

            this.copyToX(vditor, tempElement, "default");
            event.preventDefault();
        });
        this.previewElement.addEventListener("click", (event: MouseEvent & { target: HTMLElement }) => {
            const spanElement = hasClosestByMatchTag(event.target, "SPAN");
            if (spanElement && hasClosestByClassName(spanElement, "vditor-toc")) {
                const headingElement =
                    this.previewElement.querySelector("#" + spanElement.getAttribute("data-target-id")) as HTMLElement;
                if (headingElement) {
                    this.element.scrollTop = headingElement.offsetTop;
                }
                return;
            }
            if (event.target.tagName === "A") {
                if (vditor.options.link.click) {
                    vditor.options.link.click(event.target);
                } else if (vditor.options.link.isOpen) {
                    window.open(event.target.getAttribute("href"));
                }
                event.preventDefault();
                return;
            }
            if (event.target.tagName === "IMG") {
                if (vditor.options.image.preview) {
                    vditor.options.image.preview(event.target)
                } else if (vditor.options.image.isPreview) {
                    previewImage(event.target as HTMLImageElement, vditor.options.lang, vditor.options.theme);
                }
            }
        });
        this.element.appendChild(this.previewElement);
        const actions = vditor.options.preview.actions;
        if (actions.length === 0) {
            return;
        }
        const actionElement = document.createElement("div");
        actionElement.className = "vditor-preview__action";
        const actionHtml: string[] = [];
        for (let i = 0; i < actions.length; i++) {
            const action = actions[i];
            if (typeof action === "object") {
                actionHtml.push(`<button type="button" data-type="${action.key}" class="${action.className}"${action.tooltip ? ` aria-label="${action.tooltip}"` : ""}">${action.text}</button>`);
                continue;
            }
            switch (action) {
                case "desktop":
                    actionHtml.push(`<button type="button" class="vditor-preview__action--current" data-type="desktop">Desktop</button>`);
                    break;
                case "tablet":
                    actionHtml.push(`<button type="button" data-type="tablet">Tablet</button>`);
                    break;
                case "mobile":
                    actionHtml.push(`<button type="button" data-type="mobile">Mobile/Wechat</button>`);
                    break;
                case "mp-wechat":
                    actionHtml.push(`<button type="button" data-type="mp-wechat" class="vditor-tooltipped vditor-tooltipped__w" aria-label="复制到公众号"><svg><use xlink:href="#vditor-icon-mp-wechat"></use></svg></button>`);
                    break;
                case "zhihu":
                    actionHtml.push(`<button type="button" data-type="zhihu" class="vditor-tooltipped vditor-tooltipped__w" aria-label="复制到知乎"><svg><use xlink:href="#vditor-icon-zhihu"></use></svg></button>`);
                    break;
            }
        }
        actionElement.innerHTML = actionHtml.join("");
        actionElement.addEventListener(getEventName(), (event) => {
            const btn = hasClosestByTag(event.target as HTMLElement, "BUTTON");
            if (!btn) {
                return;
            }
            const type = btn.getAttribute("data-type");
            const actionCustom = actions.find((w: IPreviewActionCustom) => w?.key === type) as IPreviewActionCustom;
            if (actionCustom) {
                actionCustom.click(type);
                return;
            }

            if (type === "mp-wechat" || type === "zhihu") {
                this.copyToX(vditor, this.previewElement.cloneNode(true) as HTMLElement, type);
                return;
            }

            if (type === "desktop") {
                this.previewElement.style.width = "auto";
            } else if (type === "tablet") {
                this.previewElement.style.width = "780px";
            } else {
                this.previewElement.style.width = "360px";
            }
            if (this.previewElement.scrollWidth > this.previewElement.parentElement.clientWidth) {
                this.previewElement.style.width = "auto";
            }
            this.render(vditor);
            actionElement.querySelectorAll("button").forEach((item) => {
                item.classList.remove("vditor-preview__action--current");
            });
            btn.classList.add("vditor-preview__action--current");
        });
        this.element.insertBefore(actionElement, this.previewElement);
    }

    public render(vditor: IVditor, value?: string) {
        clearTimeout(this.mdTimeoutId);

        if (this.element.style.display === "none") {
            if (this.element.getAttribute("data-type") === "renderPerformance") {
                vditor.tip.hide();
            }
            return;
        }

        if (value) {
            this.previewElement.innerHTML = value;
            return;
        }

        if (getMarkdown(vditor)
            .replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "") === "") {
            this.previewElement.innerHTML = "";
            return;
        }

        const renderStartTime = new Date().getTime();
        const markdownText = getMarkdown(vditor);
        this.mdTimeoutId = window.setTimeout(() => {
            if (vditor.options.preview.url) {
                const xhr = new XMLHttpRequest();
                xhr.open("POST", vditor.options.preview.url);
                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            const responseJSON = JSON.parse(xhr.responseText);
                            if (responseJSON.code !== 0) {
                                vditor.tip.show(responseJSON.msg);
                                return;
                            }
                            if (vditor.options.preview.transform) {
                                responseJSON.data = vditor.options.preview.transform(responseJSON.data);
                            }
                            this.previewElement.innerHTML = responseJSON.data;
                            this.afterRender(vditor, renderStartTime);
                        } else {
                            let html = vditor.lute.Md2HTML(markdownText);
                            if (vditor.options.preview.transform) {
                                html = vditor.options.preview.transform(html);
                            }
                            this.previewElement.innerHTML = html;
                            this.afterRender(vditor, renderStartTime);
                        }
                    }
                };

                xhr.send(JSON.stringify({markdownText}));
            } else {
                let html = vditor.lute.Md2HTML(markdownText);
                if (vditor.options.preview.transform) {
                    html = vditor.options.preview.transform(html);
                }
                this.previewElement.innerHTML = html;
                this.afterRender(vditor, renderStartTime);
            }
        }, vditor.options.preview.delay);
    }

    private afterRender(vditor: IVditor, startTime: number) {
        if (vditor.options.preview.parse) {
            vditor.options.preview.parse(this.element);
        }
        const time = (new Date().getTime() - startTime);
        if ((new Date().getTime() - startTime) > 2600) {
            // https://github.com/b3log/vditor/issues/67
            vditor.tip.show(window.VditorI18n.performanceTip.replace("${x}", time.toString()));
            vditor.preview.element.setAttribute("data-type", "renderPerformance");
        } else if (vditor.preview.element.getAttribute("data-type") === "renderPerformance") {
            vditor.tip.hide();
            vditor.preview.element.removeAttribute("data-type");
        }
        const cmtFocusElement = vditor.preview.element.querySelector(".vditor-comment--focus");
        if (cmtFocusElement) {
            cmtFocusElement.classList.remove("vditor-comment--focus");
        }
        codeRender(vditor.preview.previewElement, vditor.options.preview.hljs);
        highlightRender(vditor.options.preview.hljs, vditor.preview.previewElement,
            vditor.options.cdn);
        mermaidRender(vditor.preview.previewElement, vditor.options.cdn, vditor.options.theme);
        markmapRender(vditor.preview.previewElement, vditor.options.cdn);
        SMILESRender(vditor.preview.previewElement, vditor.options.cdn, vditor.options.theme);
        flowchartRender(vditor.preview.previewElement, vditor.options.cdn);
        graphvizRender(vditor.preview.previewElement, vditor.options.cdn);
        chartRender(vditor.preview.previewElement, vditor.options.cdn, vditor.options.theme);
        mindmapRender(vditor.preview.previewElement, vditor.options.cdn, vditor.options.theme);
        plantumlRender(vditor.preview.previewElement, vditor.options.cdn);
        abcRender(vditor.preview.previewElement, vditor.options.cdn);
        if (vditor.options.preview.render.media.enable) {
            mediaRender(vditor.preview.previewElement);
        }
        vditor.options.customRenders.forEach((item) => {
            item.render(vditor.preview.previewElement, vditor);
        })
        // toc render
        const editorElement = vditor.preview.element;
        let tocHTML = vditor.outline.render(vditor);
        if (tocHTML === "") {
            tocHTML = "[ToC]";
        }
        editorElement.querySelectorAll('[data-type="toc-block"]').forEach((item: HTMLElement) => {
            item.innerHTML = tocHTML;
            mathRender(item, {
                cdn: vditor.options.cdn,
                math: vditor.options.preview.math,
            });
        });
        mathRender(vditor.preview.previewElement, {
            cdn: vditor.options.cdn,
            math: vditor.options.preview.math,
        });
    }

    private copyToX(vditor: IVditor, copyElement: HTMLElement, type = "mp-wechat") {
        // fix math render
        if (type !== "zhihu") {
            copyElement.querySelectorAll(".katex-html .base").forEach((item: HTMLElement) => {
                item.style.display = "initial";
            });
        } else {
            copyElement.querySelectorAll(".language-math").forEach((item: HTMLElement) => {
                item.outerHTML = `<img class="Formula-image" data-eeimg="true" src="//www.zhihu.com/equation?tex=" alt="${item.getAttribute("data-math")}\\" style="display: block; margin: 0 auto; max-width: 100%;">`;
            });
        }
        // 防止背景色被粘贴到公众号中
        copyElement.style.backgroundColor = "#fff";
        // 代码背景
        copyElement.querySelectorAll("code").forEach((item) => {
            item.style.backgroundImage = "none";
        });
        this.element.append(copyElement);
        const range = copyElement.ownerDocument.createRange();
        range.selectNode(copyElement);
        setSelectionFocus(range);
        document.execCommand("copy");
        copyElement.remove();

        vditor.tip.show(['zhihu', 'mp-wechat'].includes(type) ? `已复制，可到${type === "zhihu" ? "知乎" : "微信公众号平台"}进行粘贴` : `已复制到剪切板`);
    }
}
