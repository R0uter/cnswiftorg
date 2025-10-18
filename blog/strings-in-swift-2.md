---
title: "Swift 2 中的 String 字符串"
date: 2015-08-14
categories: 
  - "swift-blog"
---

Swift 提供了一种高性能的、兼容 Unicode 的字符串实现，这也成为了它自身标准库的一部分。在 Swift 2 中，

```
String
```

类型不再遵守

```
CollectionType
```

协议，那时

```
String
```

是

```
Character
```

类型的集合，就像是数组。现在

```
String
```

提供了一种公开字符集合视图的_字符_属性。 为什么要这么改变？字符串作为字符的集合，

```
String
```

类型的行为和_数组_、_集合_以及_字典_有着相当大的不同，尽管这看起来是很合乎常理的模型。事实上也一直是这样，但是由于 Swift 2 添加的一些协议上的扩展导致了其根本上的一些必要的改变。

### 不同于其部分的总和

当添加一个元素到合集当中时，我们期望这个合集能够容纳这个元素。就好像你给数组末尾添加一个值，数组就容纳了这个值。集合与字典也是这个样子。总之，当你给给字符串末尾添加一个组合符号的时候，字符串中的内容会自动改变。 假设我们设定一个字符串`“`

```
cafe
```

”，也就是四个字符

```
c
```

,

```
a
```

,

```
f
```

,

```
e
```

:

```
var letters: [Character] = ["c", "a", "f", "e"]
var string: String = String(letters)

print(letters.count) // 4
print(string) // cafe
print(string.characters.count) // 4
```

如果你在字符串末尾添加一个声调字符 “

```
U+0301
```

” 也就是符号 “

```
´
```

” 字符串仍然拥有四个字符，但是最后一个字符却变成了“é ”

```
let acuteAccent: Character = "\u{0301}" // ´ COMBINING ACUTE ACCENT' (U+0301)

string.append(acuteAccent)
print(string.characters.count) // 4
print(string.characters.last!) // é
```

字符串的_字符_属性不再包含原来的小写字母 “

```
e
```

” ，也不包含我们添加的声调符号 “

```
´
```

”。字符串现在包含了一个带着声调符号“_´_”的小写字母 “

```
é
```

” ：

```
string.characters.contains("e") // false
string.characters.contains("´") // false
string.characters.contains("é") // true
```

如果我们把其他合集都像字符串这样对待，那么比如说把

```
UIColor.redColor()
```

和

```
UIColor.greenColor()
```

 添加到一个集合里然后集合就有了

```
UIColor.yellowColor()
```

  将不足为奇。

### 基于内容字符的判断

另一个字符串和合集不同的地方是他们如何定义相等。

- 两个数组只有同时拥有相同的长度，并且每对相应索引处的元素相等时候才会相等。
- 两个集合只有同时拥有相同的长度，并且每一个元素都被两者包含时候才会相等。
- 两个字典只有他们拥有相同的键值集合才会相等。

总之，

```
String
```

是基于规范化相等来定义相等的。字符如果具有相同的语言意义和外形，我们就说它们规范化相等，就算是他们后台是由不同的 Unicode 组成也是一样。 比如说韩国的文字系统由24个符号或声调组成，代表单独的辅音和元音。只有把它们写出来的时候才会组成可读的字符。 举个栗子来讲，符号“가”(\[ga\])由字符 “ᄀ” (\[g\]) 和 “ᅡ” \[a\]组成。在 Swift 语言当中，字符串的相等不再考虑它们是由分解还是复合字符序列：

```
let decomposed = "\u{1100}\u{1161}" // ᄀ + ᅡ
let precomposed = "\u{AC00}" // 가

decomposed == precomposed // true
```

再说一句，这个行为与 Swift 中任何合集都有巨大的不同。一个有着 🐟 和 🍚的数组被视为与🍣相等将变得不足为奇。

### 取决于你的角度

字符串不是合集。但它确实还是提供

```
CollectionType
```

  视图的：

- _字符_是_字符_值的合集，或者是_[扩展字形集群](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/Strings/Articles/stringsClusters.html)_.
- _unicode标量_是 [Unicode 标量值](http://www.unicode.org/glossary/#unicode_scalar_value)的合集.
- _utf8_ 是 [UTF–8](http://www.unicode.org/glossary/#UTF_8) 代码单位的合集.
- _utf16_ 是 [UTF–16](http://www.unicode.org/glossary/#UTF_16) 代码单位的合集.

如果我们把刚才那个栗子 “café”拿过来，由分解的复合字符序列组成 \[ c, a, f, e \] 还有 \[ ´ \]，这里是各种类型字符串视图，显示了它们的组成 \[图裂了\])

- _字符_属性把用户可感知字符文本（比如说c, a, f, 和 é）分割为_扩展字形集群_ 。由于字符串必须遍历整个字符串中的每个位置（每个位置被称作代码点）以确定字符边界，访问此属性执行线性 _0（n_）时间。在处理那些包含人类可读文本字符串时，比如说那些
    
    ```
    localizedStandardCompare(_:)
    ```
    
    方法 和
    
    ```
    localizedLowercaseString
    ```
    
    属性等 高级区分区域 Unicode 算法应当有线逐字符处理。
- _Unicode标量_ 属性公开的基础标量值处存在字符串中。如果原始字符串使用预先组合的字符“ é”而不是分开的“ e + ´”，这将会反映在 Unicode 标量视图当中。当你执行字符数据的低级操作时，请使用这个API。
- _utf8_和_utf16_分别为了支持UTF-8和UFT-16表示法并提供代码点。这些值对应实际写入文件时候的特定编码。UTF-8代码单位在很多POSIX字符串处理API中使用，而UTF-16则在Cocoa和Cocoa Touch框架中表示字符串长度和偏移量。

更多关于Swift 编程语言的字符串和字符内容，请阅读 [The Swift Programming Language](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-ID285) 以及 [Swift Standard Library Reference](https://developer.apple.com/library/prerelease/ios//documentation/Swift/Reference/Swift_String_Structure/index.html#//apple_ref/swift/struct/s:SS).

* * *

本文章内容翻译自苹果官方博客 [Strings in Swift 2](https://developer.apple.com/swift/blog/?id=30) ，系本人学习为之，水平有限，如有不妥之处欢迎留言斧正。
