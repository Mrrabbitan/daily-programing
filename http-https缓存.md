1. HTTPS 和 HTTP 的缓存有什么区别

先问是不是，再问为什么。
https 在客户端的缓存机制和 http 完全一样，可以通过 HTTP Header 控制缓存策略。
在分发途径中，站长也可以通过 CDN 技术部署分布式缓存。如果你想说的是未经授权的第三方，无法私自部署透明代理缓存。

那我告诉你这不是 https 的缺陷，这恰好就是 https 的功能。杜绝未授权的第三方获取和篡改信息。

2. HTTPS 的 cookie 携带了哪些属性
   Cookie 的 Secure 属性表示只在 HTTPS 携带
