package middleware

import (
	"fmt"

	"github.com/gin-gonic/gin"

	"share-go/internal/model"
)

// Recovery 对齐 Spring ControllerAdvice：panic 时返回 ok(500, message)
func Recovery() gin.HandlerFunc {
	return gin.CustomRecovery(func(c *gin.Context, recovered interface{}) {
		c.AbortWithStatusJSON(200, model.OkWithCode(500, fmt.Sprintf("%v", recovered)))
	})
}
