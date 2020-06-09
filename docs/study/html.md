# HTMl相关

## 1. 举例三种禁止浏览器缓存的头字段，并写出响应的设置值
Expires: 告诉浏览器把回送的资源缓存多长时间，-1或0为不缓存。添加Expires头能有效的利用浏览器的缓存能力来改善页面的性能，能在后续的页面中有效
避免很多不必要的http请求。
Cache-control: no-cache Cache-control max-age=31536000
Pragma: no-cache
