## 两数相加

给你两个   非空 的链表，表示两个非负的整数。它们每位数字都是按照   逆序   的方式存储的，并且每个节点只能存储   一位   数字。
请你将两个数相加，并以相同形式返回一个表示和的链表。
你可以假设除了数字 0 之外，这两个数都不会以 0  开头。

示例 1：

输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807.
复制代码
示例 2：
输入：l1 = [0], l2 = [0]
输出：[0]
复制代码
示例 3：
输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出：[8,9,9,9,0,0,0,1]
复制代码
这个两个数相加就跟我们之前简单题有一道叫做：加 1，算法过程几乎是一模一样的.
不过需要注意：做有关链表的题，有个隐藏技巧：添加一个虚拟头结点（哨兵节点），帮助简化边界情况的判断
具体思路。
思路：
从最低位至最高位，逐位相加，如果和大于等于 10，则保留个位数字，同时向前一位进 1 如果最高位有进位，则需在最前面补 1。
var addTwoNumbers = function(l1, l2) {
let carry= 0;
let pre = point = new ListNode();
while(l1 || l2){
point.next = new ListNode();
point = point.next;
let sum = 0;
if(l1){
sum += l1.val;
l1 = l1.next;
}
if(l2){
sum += l2.val;
l2 = l2.next;
}
sum = sum + carry;
point.val = sum % 10;
carry = (sum / 10) | 0;
}
if(carry) point.next = new ListNode(carry);
return pre.next;
};
