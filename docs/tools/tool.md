# 通用工具

## js复制文字信息
> [document.execCommand](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand):当一个HTML文档切换到设计模式时，document暴露 execCommand 方法，该方法允许运行命令来操纵可编辑内容区域的元素。
语法：bool = document.execCommand(aCommandName(命令名称), aShowDefaultUI(是否展示用户界面), aValueArgument(一些额外的参数))

- document.getElementById("myText").select();select() 方法用于选取文本域中的内容。
- HTMLInputElement.setSelectionRange方法可以从一个被 focused 的 < input > 元素中选中特定范围的内容。
```javascript
const copyToClipboard = str => {
  const el = document.createElement('textarea');  // 创建一个 <textarea> 元素
  el.value = str;                                 // 设置它的值为你想复制的字符串
  el.setAttribute('readonly', '');                // 设置为只读以防止干扰
  el.style.position = 'absolute';                 
  el.style.left = '-9999px';                      // 移出屏幕外以使其不可见
  document.body.appendChild(el);                  // 插入 <textarea> 元素到 HTML 文档中
  const selected =            
    document.getSelection().rangeCount > 0        // 检查是否之前曾选中过内容
      ? document.getSelection().getRangeAt(0)     // 如果找到，则保存选中
      : false;                                    // 标记为  false 以表示不存在之前选中的内容
  el.select();                                    // 选中 <textarea> 的内容
  document.execCommand('copy');                   // 复制 - 仅当作为用户操作的响应结果时才可以工作(比如，点击事件)
  document.body.removeChild(el);                  // 移除 <textarea> 元素
  if (selected) {                                 // 如果在复制前已存在选中的内容
    document.getSelection().removeAllRanges();    // 取消 HTML 文档中所有的选中部分
    document.getSelection().addRange(selected);   // 恢复原来的选中
  }
};
```