package com.buguagaoshu.share.controller;

import com.buguagaoshu.share.config.WebConstant;
import com.buguagaoshu.share.domain.ConfigData;
import com.buguagaoshu.share.domain.ResponseDetails;
import com.buguagaoshu.share.domain.User;
import com.buguagaoshu.share.repository.ConfigRepository;
import com.buguagaoshu.share.service.ViewCountService;
import com.buguagaoshu.share.utils.IpUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

/**
 * @author Pu Zhiwei {@literal puzhiweipuzhiwei@foxmail.com}
 * @create 2024-06-28
 */
@RestController
public class AiController {
    private ConfigRepository configRepository;

    private final String AI_CONFIG = "AI_CONFIG";

    private final String INVITATION_CODE = "invitationCode";

    private final ViewCountService viewCountService;
    private final IpUtils ipUtils;

    private Map<String, ConfigData> configDataMap = null;

    public AiController(ConfigRepository configRepository, ViewCountService viewCountService, IpUtils ipUtils) {
        this.configRepository = configRepository;
        this.viewCountService = viewCountService;
        this.ipUtils = ipUtils;
        configDataMap = new HashMap<>();
        for (ConfigData configData : this.configRepository.findAll()) {
            this.configDataMap.put(configData.getName(), configData);
        }
    }


    @PostMapping("/api/ai/config")
    public ResponseDetails getAiConfig(@RequestBody Map<String, String> map, HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute(WebConstant.LOGIN_USER);
        if (user != null) {
            return ResponseDetails.ok().put("data", this.configDataMap.get(AI_CONFIG));
        } else {
            ConfigData data = configDataMap.get(map.get(INVITATION_CODE));
            if (data != null) {
                // 记录访问日志
                viewCountService.addViewCountLog(WebConstant.VIEW_LOG_TYPE_AI, data.getId(), ipUtils.getIpAddr(request), ipUtils.getUa(request));
                return ResponseDetails.ok().put("data", this.configDataMap.get(AI_CONFIG));
            }
        }
        return ResponseDetails.ok();
    }

    @GetMapping("/api/ai/check")
    public ResponseDetails checkAiPower(HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute(WebConstant.LOGIN_USER);
        if (user != null) {
            return ResponseDetails.ok().put("data", true);
        } else {
            return ResponseDetails.ok().put("data", false);
        }
    }

    @PostMapping("/api/ai/save")
    public ResponseDetails setAiConfig(@RequestBody ConfigData configData) {
        ConfigData byName = configRepository.findByName(AI_CONFIG);
        if (byName != null) {
            byName.setConfigMessage(configData.getConfigMessage());
            byName.setUpdateTime(System.currentTimeMillis());
            configRepository.save(byName);
            configDataMap.put(byName.getName(), byName);
        } else {
            configData.setName(AI_CONFIG);
            configData.setCreateTime(System.currentTimeMillis());
            configData.setUpdateTime(System.currentTimeMillis());
            configRepository.save(configData);
            configDataMap.put(configData.getName(), configData);
        }

        return ResponseDetails.ok();
    }

    @PostMapping("/api/ai/invitation")
    public ResponseDetails createAiInvitationCode() {
        String string = UUID.randomUUID().toString();
        ConfigData data = new ConfigData();
        data.setName(string);
        data.setCreateTime(System.currentTimeMillis());
        data.setUpdateTime(System.currentTimeMillis());
        data.setConfigMessage("邀请码");
        configRepository.save(data);
        configDataMap.put(data.getName(), data);
        return ResponseDetails.ok().put("data", data);
    }

    @GetMapping("/api/ai/invitation/list")
    public ResponseDetails listAiInvitationCode() {
        List<ConfigData> list = new ArrayList<>();
        for (ConfigData data : configDataMap.values()) {
            if (data.getConfigMessage().equals("邀请码")) {
                list.add(data);
            }
        }

        return ResponseDetails.ok().put("data", list);
    }

    @PostMapping("/api/ai/invitation/delete")
    public ResponseDetails deleteAiInvitationCode(@RequestBody ConfigData configData) {
        configDataMap.remove(configData.getName());
        configRepository.delete(configData);
        return ResponseDetails.ok();
    }
}
