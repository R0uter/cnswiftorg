---
title: "协议"
date: 2015-08-14
sidebar_position: 27
---

_协议_为方法、属性、以及其他特定的任务需求或功能定义蓝图。协议可被类、结构体、或枚举类型_采纳_以提供所需功能的具体实现。满足了协议中需求的任意类型都叫做_遵循_了该协议。

除了指定遵循类型必须实现的要求外，你可以扩展一个协议以实现其中的一些需求或实现一个符合类型的可以利用的附加功能。

## 协议的语法

定义协议的方式与类、结构体、枚举类型非常相似：

```
protocol SomeProtocol {
    // protocol definition goes here
}
```

在自定义类型声明时，将协议名放在类型名的冒号之后来表示该类型采纳一个特定的协议。多个协议可以用逗号分开列出：

```
struct SomeStructure: FirstProtocol, AnotherProtocol {
    // structure definition goes here
}

```

若一个类拥有父类，将这个父类名放在其采纳的协议名之前，并用逗号分隔：

```
class SomeClass: SomeSuperclass, FirstProtocol, AnotherProtocol {
    // class definition goes here
}

```

## 属性要求

协议可以要求所有遵循该协议的类型提供特定名字和类型的实例属性或类型属性。协议并不会具体说明属性是储存型属性还是计算型属性——它只具体要求属性有特定的名称和类型。协议同时要求一个属性必须明确是可读的或可读的_和_可写的。

若协议要求一个属性为可读和可写的，那么该属性要求不能用常量存储属性或只读计算属性来满足。若协议只要求属性为可读的，那么任何种类的属性都能满足这个要求，而且如果你的代码需要的话，该属性也可以是可写的。

属性要求定义为变量属性，在名称前面使用var 关键字。可读写的属性使用{ get set } 来写在声明后面来明确，使用{ get } 来明确可读的属性。

```
protocol SomeProtocol {
    var mustBeSettable: Int { get set }
    var doesNotNeedToBeSettable: Int { get }
}
```

在协议中定义类型属性时在前面添加static 关键字。当类的实现使用class 或static 关键字前缀声明类型属性要求时，这个规则仍然适用：

```
protocol AnotherProtocol {
    static var someTypeProperty: Int { get set }
}
```

这里是一个只有一个实例属性要求的协议：

```
protocol FullyNamed {
    var fullName: String { get }
}
```

上面FullyNamed 协议要求遵循的类型提供一个完全符合的名字。这个协议并未指定遵循类型的其他任何性质——它只要求这个属性必须为其自身提供一个全名。协议申明了所有FullyNamed 类型必须有一个可读实例属性fullName ，且为String 类型。

这里是一个采纳并遵循FullyNamed 协议的结构体的例子：

```
struct Person: FullyNamed {
    var fullName: String
}
let john = Person(fullName: "John Appleseed")
// john.fullName is "John Appleseed"
```

这个例子定义了一个名为Person 的结构体，它表示一个有名字的人。它在其第一行定义中表明了它采纳FullyNamed 协议作为它自身的一部分。

每一个Person 的实例都有一个名为fullName 的String 类型储存属性。这符合了FullyNamed 协议的单一要求，并且表示Person 已经正确地遵循了该协议。（若协议的要求没有完全达标，Swift 在编译时会报错。）

这里是一个更加复杂的类，采纳并遵循了FullyNamed 协议：

```
class Starship: FullyNamed {
    var prefix: String?
    var name: String
    init(name: String, prefix: String? = nil) {
        self.name = name
        self.prefix = prefix
    }
    var fullName: String {
        return (prefix != nil ? prefix! + " " : "") + name
    }
}
var ncc1701 = Starship(name: "Enterprise", prefix: "USS")
// ncc1701.fullName is "USS Enterprise"
```

这个类为一艘星舰实现了fullName 计算型只读属性的要求。每一个Starship 类的实例储存了一个不可选的name 属性以及一个可选的prefix 属性。当prefix 值存在时，fullName 将prefix 放在name 之前以创建星舰的全名。

## 方法要求

协议可以要求采纳的类型实现指定的实例方法和类方法。这些方法作为协议定义的一部分，书写方式与正常实例和类方法的方式完全相同，但是不需要大括号和方法的主体。允许变量拥有参数，与正常的方法使用同样的规则。但在协议的定义中，方法参数不能定义默认值。

正如类型属性要求的那样，当协议中定义类型方法时，你总要在其之前添加static 关键字。即使在类实现时，类型方法要求使用class 或static 作为关键字前缀，前面的规则仍然适用：

```
protocol SomeProtocol {
    static func someTypeMethod()
}
```

下面的例子定义了一个只有一个实例方法要求的协议：

```
protocol RandomNumberGenerator {
    func random() -> Double
}

```

这里RandomNumberGenerator 协议要求所有采用该协议的类型都必须有一个实例方法random ，而且要返回一个Double 的值，无论这个值叫什么。尽管协议没有明确定义，这里默认这个值在 0.0  到 1.0 （不包括）之间。

RandomNumberGenerator 协议并不为随机值的生成过程做任何定义，它只要求生成器提供一个生成随机数的标准过程。

这里有一个采用并遵循RandomNumberGenerator 协议的类的实现。这个类实现了著名的 _linear congruential generator_ 伪随机数发生器算法：

```
class LinearCongruentialGenerator: RandomNumberGenerator {
    var lastRandom = 42.0
    let m = 139968.0
    let a = 3877.0
    let c = 29573.0
    func random() -> Double {
        lastRandom = ((lastRandom * a + c).truncatingRemainder(dividingBy:m))
        return lastRandom / m
    }
}
let generator = LinearCongruentialGenerator()
print("Here's a random number: \(generator.random())")
// Prints "Here's a random number: 0.37464991998171"
print("And another one: \(generator.random())")
// Prints "And another one: 0.729023776863283"

```

## 异变方法要求

有时一个方法需要改变（或_异变_）其所属的实例。例如值类型的实例方法（即结构体或枚举），在方法的func 关键字之前使用mutating 关键字，来表示在该方法可以改变其所属的实例，以及该实例的所有属性。这一过程写在了[在实例方法中修改值类型](https://www.cnswift.org/methods#spl-2)中。

若你定义了一个协议的实例方法需求，想要异变任何采用了该协议的类型实例，只需在协议里方法的定义当中使用mutating 关键字。这允许结构体和枚举类型能采用相应协议并满足方法要求。

> 注意 如果你在协议中标记实例方法需求为mutating ，在为类实现该方法的时候不需要写mutating 关键字。mutating 关键字只在结构体和枚举类型中需要书写。

下面的例子定义了一个名为Togglable 的协议，协议只定义了一个实例方法要求叫做toggle 。顾名思义，toggle() 方法将切换或转换任何遵循该协议的类型的状态，典型地，修改该类型的属性。

在Togglable协议的定义中，toggle() 方法使用mutating 关键字标记，来表明该方法在调用时会改变遵循该协议的实例的状态：

```
protocol Togglable {
    mutating func toggle()
}
```

若使用结构体或枚举实现Togglable 协议，这个结构体或枚举可以通过使用mutating 标记这个toggle() 方法，来保证该实现符合协议要求。

下面的例子定义了一个名为OnOffSwitch 的枚举。这个枚举在两种状态间改变，即枚举成员On 和Off 。该枚举的toggle 实现使用了mutating 关键字，以满足Togglable 协议需求：

```
enum OnOffSwitch: Togglable {
    case off, on
    mutating func toggle() {
        switch self {
        case .off:
            self = .on
        case .on:
            self = .off
        }
    }
}
var lightSwitch = OnOffSwitch.off
lightSwitch.toggle()
// lightSwitch is now equal to .on

```

## 初始化器要求

协议可以要求遵循协议的类型实现指定的初始化器。和一般的初始化器一样，只用将初始化器写在协议的定义当中，只是不用写大括号也就是初始化器的实体：

```
protocol SomeProtocol {
    init(someParameter: Int)
}

```

### 协议初始化器要求的类实现

你可以通过实现指定初始化器或便捷初始化器来使遵循该协议的类满足协议的初始化器要求。在这两种情况下，你都必须使用required 关键字修饰初始化器的实现：

```
class SomeClass: SomeProtocol {
    required init(someParameter: Int) {
        // initializer implementation goes here
    }
}
```

在遵循协议的类的所有子类中，required 修饰的使用保证了你为协议初始化器要求提供了一个明确的继承实现。

详见[必要初始化器](https://www.cnswift.org/initialization#spl-26)。

> 注意
> 
> 由于final 的类不会有子类，如果协议初始化器实现的类使用了final 标记，你就不需要使用required 来修饰了。因为这样的类不能被继承子类。详见[阻止重写](https://www.cnswift.org/inheritance#spl-8)了解更多final 修饰符的信息。

如果一个子类重写了父类指定的初始化器，并且遵循协议实现了初始化器要求，那么就要为这个初始化器的实现添加required 和override 两个修饰符：

```
protocol SomeProtocol {
    init()
}
 
class SomeSuperClass {
    init() {
        // initializer implementation goes here
    }
}
 
class SomeSubClass: SomeSuperClass, SomeProtocol {
    // "required" from SomeProtocol conformance; "override" from SomeSuperClass
    required override init() {
        // initializer implementation goes here
    }
}

```

### 可失败初始化器要求

如同[可失败初始化器](https://www.cnswift.org/initialization#spl-21)定义的一样，协议可以为遵循该协议的类型定义可失败的初始化器。

遵循协议的类型可以使用一个可失败的或不可失败的初始化器满足一个可失败的初始化器要求。不可失败初始化器要求可以使用一个不可失败初始化器或隐式展开的可失败初始化器满足。

## 将协议作为类型

实际上协议自身并不实现功能。不过你创建的任意协议都可以变为一个功能完备的类型在代码中使用。

由于它是一个类型，你可以在很多其他类型可以使用的地方使用协议，包括：

- 在函数、方法或者初始化器里作为形式参数类型或者返回类型；
- 作为常量、变量或者属性的类型；
- 作为数组、字典或者其他存储器的元素的类型。

> 注意
> 
> 由于协议是类型，要开头大写（比如说FullyNamed 和RandomNumberGenerator ）来匹配 Swift 里其他类型名称格式（比如说Int 、String 还有Double ）。

这里有一个把协议用作类型的例子：

```
class Dice {
    let sides: Int
    let generator: RandomNumberGenerator
    init(sides: Int, generator: RandomNumberGenerator) {
        self.sides = sides
        self.generator = generator
    }
    func roll() -> Int {
        return Int(generator.random() * Double(sides)) + 1
    }
}
```

这个例子定义了一个叫做Dice 的新类，它表示一个用于棋盘游戏的 _n_ 面骰子。Dice 实例有一个叫做sides 的整数属性，它表示了骰子有多少个面，还有个叫做generator 的属性，它提供了随机数的生成器来生成骰子的值。

generator 属性是RandomNumberGenerator 类型。因此，你可以把它放到任何采纳了RandomNumberGenerator 协议的类型的实例里。除了这个实例必须采纳RandomNumberGenerator 协议以外，没有其他任何要求了。

Dice 也有一个初始化器，来设置初始状态。这个初始化器有一个形式参数叫做generator ，它同样也是RandomNumberGenerator 类型。你可以在初始化新的Dice 实例的时候传入一个任意遵循这个协议的类型的值到这个形式参数里。

Dice 提供了一个形式参数方法，roll ，它返回一个介于 1 和骰子面数之间的整数值。这个方法调用生成器的random() 方法来创建一个新的介于0.0 和1.0 之间的随机数，然后使用这个随机数来在正确的范围创建一个骰子的值。由于generator 已知采纳了RandomNumberGenerator ，它保证了会有random() 方法以供调用。

这里是Dice 类使用LinearCongurentialGenerator 实例作为用于创建一个六面骰子的随机数生成器来创建一个六面骰子的过程：

```
var d6 = Dice(sides: 6, generator: LinearCongruentialGenerator())
for _ in 1...5 {
    print("Random dice roll is \(d6.roll())")
}
// Random dice roll is 3
// Random dice roll is 5
// Random dice roll is 4
// Random dice roll is 5
// Random dice roll is 4

```

## 委托

_委托\[1\]_是一个允许类或者结构体放手（或者说委托）它们自身的某些责任给另外类型实例的设计模式。这个设计模式通过定义一个封装了委托责任的协议来实现，比如遵循了协议的类型（所谓的委托）来保证提供被委托的功能。委托可以用来响应一个特定的行为，或者从外部资源取回数据而不需要了解资源具体的类型。

> 译注
> 
> \[1\]，_Delegation 委托，可能也以“代理”而为人熟知，这里我们选择译为“委托”是为了更好的理解避免混淆。_

下面的例子定义了两个协议以用于基于骰子的棋盘游戏：

```
class DiceGame {
    let sides: Int
    let generator = LinearCongruentialGenerator()
    weak var delegate: Delegate?

    init(sides: Int) {
        self.sides = sides
    }

    func roll() -> Int {
        return Int(generator.random() * Double(sides)) + 1
    }

    func play(rounds: Int) {
        delegate?.gameDidStart(self)
        for round in 1...rounds {
            let player1 = roll()
            let player2 = roll()
            if player1 == player2 {
                delegate?.game(self, didEndRound: round, winner: nil)
            } else if player1 > player2 {
                delegate?.game(self, didEndRound: round, winner: 1)
            } else {
                delegate?.game(self, didEndRound: round, winner: 2)
            }
        }
        delegate?.gameDidEnd(self)
    }

    protocol Delegate: AnyObject {
        func gameDidStart(_ game: DiceGame)
        func game(_ game: DiceGame, didEndRound round: Int, winner: Int?)
        func gameDidEnd(_ game: DiceGame)
    }
}
```

DiceGame 类实现了一个扔骰子游戏，每个玩家依次扔骰子，最高点者获胜。它使用本章前面例子中的线性全等生成器来生成掷骰子的随机数。

DiceGame.Delegate 协议可以被任何想要追踪游戏进度的类型采纳。因为 DiceGame.Delegate 协议会在整个骰子游戏上下文中被使用到，它内嵌在 DiceGame类中。协议可以内嵌在类声明中，就像其他类和结构体一样，只要上层声明不是泛型即可。移步[内嵌类型](https://www.cnswift.org/nested-types)了解更多。

为防止强引用循环，委托被声明为弱引用。有关弱引用的信息，请参阅类[实例之间的强引用循环](https://www.cnswift.org/automatic-reference-counting#%e7%b1%bb%e5%ae%9e%e4%be%8b%e4%b9%8b%e9%97%b4%e7%9a%84%e5%be%aa%e7%8e%af%e5%bc%ba%e5%bc%95%e7%94%a8)。将协议标记为类专用后，DiceGame  类就可以声明其委托必须使用弱引用。类专用协议通过从 AnyObject  继承来标记，详见[类专用协议](https://www.cnswift.org/protocols#%e7%b1%bb%e4%b8%93%e7%94%a8%e7%9a%84%e5%8d%8f%e8%ae%ae)。

DiceGame.Delegate  提供了三种用于跟踪游戏进度的方法。这三个方法已纳入上述 play(rounds:)  方法的游戏逻辑中。当新游戏开始、新回合开始或游戏结束时，DiceGame  类会调用其委托方法。

由于委托属性是可选的 DiceGame.Delegate ，因此 play(rounds:)  方法在每次调用委托方法时都会使用可选链，这在[可选链](https://www.cnswift.org/optional-chaining)中讨论过。如果委托属性为 nil ，这些委托调用将被忽略。如果委托属性为非零，则会调用委托方法，并将 DiceGame  实例作为参数传递给委托方法。

接下来的示例展示了一个名为 DiceGameTracker  的类，该类采用了 DiceGame.Delegate  协议：

```
class DiceGameTracker: DiceGame.Delegate {
    var playerScore1 = 0
    var playerScore2 = 0
    func gameDidStart(_ game: DiceGame) {
        print("Started a new game")
        playerScore1 = 0
        playerScore2 = 0
    }
    func game(_ game: DiceGame, didEndRound round: Int, winner: Int?) {
        switch winner {
            case 1:
                playerScore1 += 1
                print("Player 1 won round \(round)")
            case 2: playerScore2 += 1
                print("Player 2 won round \(round)")
            default:
                print("The round was a draw")
        }
    }
    func gameDidEnd(_ game: DiceGame) {
        if playerScore1 == playerScore2 {
            print("The game ended in a draw.")
        } else if playerScore1 > playerScore2 {
            print("Player 1 won!")
        } else {
            print("Player 2 won!")
        }
    }
}
```

DiceGameTracker 实现了DiceGame.Delegate 要求的所有方法。它使用这些方法在新游戏开始时清零两位玩家的分数，在每轮游戏结束时更新他们的分数，并在游戏结束时宣布获胜者。

这里是DiceGameTracker 的运行结果：

```
let tracker = DiceGameTracker()
let game = DiceGame(sides: 6)
game.delegate = tracker
game.play(rounds: 3)
// Started a new game
// Player 2 won round 1
// Player 2 won round 2
// Player 1 won round 3
// Player 2 won!
```

## 在扩展里添加协议遵循

你可以扩展一个已经存在的类型来采纳和遵循一个新的协议，就算是你无法访问现有类型的源代码也行。扩展可以添加新的属性、方法和下标到已经存在的类型，并且因此允许你添加协议需要的任何需要。要了解更多关于扩展的信息，见[扩展](https://www.cnswift.org/extensions)。

> 注意
> 
> 类型已经存在的实例会在给它的类型扩展中添加遵循协议时自动地采纳和遵循这个协议。

举例来说，这个协议，叫做TextRepresentable ，可以被任何可以用文本表达的类型实现。这可能是它自身的描述，或者是它当前状态的文字版显示：

```
protocol TextRepresentable {
    var textualDescription: String { get }
}
```

先前的Dice 类可以扩展来采纳和遵循TextRepresentable ：

```
extension Dice: TextRepresentable {
    var textualDescription: String {
        return "A \(sides)-sided dice"
    }
}
```

这个扩展使用了与Dice 提供它原本实现完全相同的方式来采纳了新的协议。协议名写在类型的名字之后，用冒号隔开，并且在扩展的花括号里实现了所有协议的需要。

任何Dice 实例现在都可以被视作TextRepresentable ：

```
let d12 = Dice(sides: 12, generator: LinearCongruentialGenerator())
print(d12.textualDescription)
// Prints "A 12-sided dice"
```

类似地，SnakesAndLadders 游戏类可以扩展来采纳和遵循TextRepresentable 协议：

```
extension SnakesAndLadders: TextRepresentable {
    var textualDescription: String {
        return "A game of Snakes and Ladders with \(finalSquare) squares"
    }
}
print(game.textualDescription)
// Prints "A game of Snakes and Ladders with 25 squares"

```

### 有条件地遵循协议

泛型类型可能只在某些情况下满足一个协议的要求，比如当类型的泛型形式参数遵循对应协议时。你可以通过在扩展类型时列出限制让泛型类型有条件地遵循某协议。在你采纳协议的名字后面写泛型where 分句。更多关于泛型where 分句，见[泛型Where分句](https://www.cnswift.org/generics#Where)。

下面的扩展让Array 类型在存储遵循TextRepresentable 协议的元素时遵循TextRepresentable 协议。

```
extension Array: TextRepresentable where Element: TextRepresentable {
    var textualDescription: String {
        let itemsAsText = self.map { $0.textualDescription }
        return "[" + itemsAsText.joined(separator: ", ") + "]"
    }
}
let myDice = [d6, d12]
print(myDice.textualDescription)
// Prints "[A 6-sided dice, A 12-sided dice]"

```

### 使用扩展声明采纳协议

如果一个类型已经遵循了协议的所有需求，但是还没有声明它采纳了这个协议，你可以让通过一个空的扩展来让它采纳这个协议：

```
struct Hamster {
    var name: String
    var textualDescription: String {
        return "A hamster named \(name)"
    }
}
extension Hamster: TextRepresentable {}
```

Hamster 实例现在可以用在任何TextRepresentable 类型可用的地方了：

```
let simonTheHamster = Hamster(name: "Simon")
let somethingTextRepresentable: TextRepresentable = simonTheHamster
print(somethingTextRepresentable.textualDescription)
// Prints "A hamster named Simon"
```

> 注意类型不会因为满足需要就自动采纳协议。它们必须显式地声明采纳了哪个协议。

## 使用综合实现来采纳协议

Swift 在大多数简单情况下能自动提供Equatable 、Hashable 以及Comparable 协议遵循。使用这些合成实现意味着你不需要自己去使用大量重复代码实现这些协议需求。

Swift 为以下自定义类型提供了Equatable 的综合实现：

- 只包含遵循Equatable 协议的存储属性的结构体；
- 只关联遵循Equatable 协议的类型的枚举；
- 没有关联类型的枚举。

要获取\== 的综合实现，只需要在原本声明的文件中声明其遵循Equatable 协议，但不要手动实现\== 运算符即可。Equatable 协议提供了默认的!= 实现。

下面的例子为三维位置向量(x, y, z) 定义了一个Vector3D 结构体，与Vector2D 结构体类似。由于x 、y 和z 属性都是Equatable 类型，Vector3D 就可以直接使用综合实现中的等价运算符。

Swift为以下自定义类型提供了Hashable 的综合实现：

- 只包含遵循Hashable 协议的存储属性的结构体；
- 只关联遵循Hashable 协议的类型的枚举；
- 没有关联类型的枚举。

要获取hash(into:) 的综合实现，只需要在原本声明的文件中声明其遵循Hashable 协议，但不要手动实现hash(into:) 方法。

Swift为不包含原始值的枚举提供Comparable 的综合实现。如果枚举拥有关联类型，这些类型必须都遵循Comparable 协议。要获取< 的综合实现，只需要在原本声明的文件中声明其遵循Comparable 协议，但不要手动实现<运算符。Comparable 协议的默认实现<= 、\> 和\>= 提供了其他比较运算符。

下面的例子定义了一个包含 beginners、intermediates以及 experts 情况的枚举SkillLevel 。Experts 还额外使用数字来记录他们拥有的星星数量等级。

```
enum SkillLevel: Comparable {
    case beginner
    case intermediate
    case expert(stars: Int)
}
var levels = [SkillLevel.intermediate, SkillLevel.beginner,
              SkillLevel.expert(stars: 5), SkillLevel.expert(stars: 3)]
for level in levels.sorted() {
    print(level)
}
// Prints "beginner"
// Prints "intermediate"
// Prints "expert(stars: 3)"
// Prints "expert(stars: 5)"
```

## 协议类型的集合

协议可以用作储存在集合比如数组或者字典中的类型，如同在协议作为类型（此处应有链接）。这个例子创建了一个TextRepresentable 实例的数组：

```
let things: [TextRepresentable] = [game, d12, simonTheHamster]
```

现在可以遍历数组中的元素了，并且打印每一个元素的文本化描述：

```
for thing in things {
    print(thing.textualDescription)
}
// A game of Snakes and Ladders with 25 squares
// A 12-sided dice
// A hamster named Simon
```

注意thing 常量是TextRepresentable 类型。它不是Dice 类型，抑或DiceGame 还是Hamster ，就算后台实际类型是它们之一。总之，由于它是TextRepresentable ，并且TextRepresentable 唯一已知的信息就是包含了textualDescription 属性，所以每次循环来访问thing.textualDescription 是安全的。

## 协议继承

协议可以_继承_一个或者多个其他协议并且可以在它继承的基础之上添加更多要求。协议继承的语法与类继承的语法相似，只不过可以选择列出多个继承的协议，使用逗号分隔：

```
protocol InheritingProtocol: SomeProtocol, AnotherProtocol {
    // protocol definition goes here
}
```

这里是一个继承了上边TextRepresentable 协议的例子：

```
protocol PrettyTextRepresentable: TextRepresentable {
    var prettyTextualDescription: String { get }
}

```

这个例子定义了一个新的协议PrettyTextRepresentable ，它继承自TextRepresentable 。任何采用了PrettyTextRepresentable 的类型都必须满足所有TextRepresentable 强制的需要，_另外_还有PrettyTextRepresentable 强制的要求。在这个例子中，PrettyTextRepresentable 添加了一个叫做prettyTextualDescription 的可读属性，它返回一个String 。

SnakesAndLadders 类可以通过扩展来采纳和遵循PrettyTextRepresentable ：

```
extension SnakesAndLadders: PrettyTextRepresentable {
    var prettyTextualDescription: String {
        var output = textualDescription + ":\n"
        for index in 1...finalSquare {
            switch board[index] {
            case let ladder where ladder > 0:
                output += "▲ "
            case let snake where snake < 0:
                output += "▼ "
            default:
                output += "○ "
            }
        }
        return output
    }
}
```

这个扩展声明了它采纳了PrettyTextRepresentable 协议并且为SnakesAndLadders 类提供了prettyTextualDescription 属性的实现。任何PrettyTextRepresentable 必须同时是TextRepresentable ，并且prettyTextualDescription 起始于访问TextRepresentable 协议的textualDescription 属性来开始输出字符串。它追加了一个冒号和一个换行符，并且使用这个作为友好文本输出的开始。它随后遍历棋盘数组，追加几何图形来表示每个方格的内容：

- 如果方格的值大于0  ，它是梯子的底部，就表示为▲ ；
- 如果方格的值小于0  ，它是蛇的头部，就表示为▼ ；
- 否则，方格的值为0  ，是“自由”方格，表示为○ 。

现在PrettyTextRepresentable 属性可以用来输出任何SnakesAndLadders 实例的友好文本描述了：

```
print(game.prettyTextualDescription)
// A game of Snakes and Ladders with 25 squares:
// ○ ○ ▲ ○ ○ ▲ ○ ○ ▲ ▲ ○ ○ ○ ▼ ○ ○ ○ ○ ▼ ○ ○ ▼ ○ ▼ ○

```

## 类专用的协议

通过添加AnyObject 关键字到协议的继承列表，你就可以限制协议只能被类类型采纳（并且不是结构体或者枚举）。

```
protocol SomeClassOnlyProtocol: AnyObject, SomeInheritedProtocol {
    // class-only protocol definition goes here
}
```

在上边的例子当中，SomeClassOnlyProtocol 只能被类类型采纳。如果在结构体或者枚举中尝试采纳SomeClassOnlyProtocol 就会出发编译时错误。

> 注意在协议的要求假定或需要遵循的类型拥有引用语意的时候使用类专用的协议而不是值语意。要了解更多关于引用和值语意，见[结构体和枚举是值类型](https://www.cnswift.org/classes-and-structures#spl-6)和[类是引用类型](https://www.cnswift.org/classes-and-structures#spl-7)。

## 协议组合

要求一个类型一次遵循多个协议是很有用的。你可以使用_协议组合_来复合多个协议到一个要求里。协议组合行为就和你定义的临时局部协议一样拥有构成中所有协议的需求。协议组合不定义任何新的协议类型。

协议组合使用SomeProtocol & AnotherProtocol 的形式。你可以列举任意数量的协议，用和符号连接（& ），使用逗号分隔。除了协议列表，协议组合也能包含类类型，这允许你标明一个需要的父类。

这里是一个复合两个叫做Named 和Aged 的协议到函数形式参数里一个协议组合要求的例子：

```
protocol Named {
    var name: String { get }
}
protocol Aged {
    var age: Int { get }
}
struct Person: Named, Aged {
    var name: String
    var age: Int
}
func wishHappyBirthday(to celebrator: Named & Aged) {
    print("Happy birthday, \(celebrator.name), you're \(celebrator.age)!")
}
let birthdayPerson = Person(name: "Malcolm", age: 21)
wishHappyBirthday(to: birthdayPerson)
// Prints "Happy birthday, Malcolm, you're 21!"
```

这个例子定义了一个叫做Named 的协议，它只有一个叫做name 的可读String 属性要求。它同样定义了一个叫做Aged 的协议，只有一个叫做age 的Int 属性要求。两个协议都被叫做Person 的结构体采纳。

例子中同样定义了一个叫做wishHappyBirthday(to:) 的函数，celebrator 形式参数的类型是Named & Aged ，这意味着“任何同时遵循Named 和Aged 的协议。”它不关心具体是什么样的类型传入函数，只要它遵循这两个要求的协议即可。

然后例子中又创建了一个新的叫做birthdayPerson 的Person 实例并且把这个新的实例传入wishHappyBirthday(to:) 函数。由于Person 同时遵循两个协议，所以这是合法调用，并且wishHappyBirthday(to:) 函数能够打印出生日祝福。

这里是一个包含了先前例子中Named 协议以及一个Location 类的例子：

```
class Location {
    var latitude: Double
    var longitude: Double
    init(latitude: Double, longitude: Double) {
        self.latitude = latitude
        self.longitude = longitude
    }
}
class City: Location, Named {
    var name: String
    init(name: String, latitude: Double, longitude: Double) {
        self.name = name
        super.init(latitude: latitude, longitude: longitude)
    }
}
func beginConcert(in location: Location & Named) {
    print("Hello, \(location.name)!")
}
 
let seattle = City(name: "Seattle", latitude: 47.6, longitude: -122.3)
beginConcert(in: seattle)
// Prints "Hello, Seattle!"
```

函数beginConcert(in:) 接收一个Location & Named 类型的形式参数，也就是说任何Location 的子类且遵循Named 协议的类型。具体到这里，City 同事满足两者需求。

如果你尝试过传birthdayPerson 给beginConcert(in:) 函数，这是非法的，由于Person 不是Location 的子类。同理，如果你创建了一个Location 的子类但并不遵循Named 协议，用这个类型调用beginConcert(in:) 也是非法的。

## 协议遵循的检查

你可以使用[类型转换](https://www.cnswift.org/type-casting)中描述的is 和as 运算符来检查协议遵循，还能转换为特定的协议。检查和转换协议的语法与检查和转换类型是完全一样的：

- 如果实例遵循协议is运算符返回true 否则返回false ；
- as? 版本的向下转换运算符返回协议的可选项，如果实例不遵循这个协议的话值就是nil ；
- as! 版本的向下转换运算符强制转换协议类型并且在失败是触发运行时错误。

这个例子定义了一个叫做HasArea 的协议，只有一个叫做area 的可读Double 属性要求：

```
protocol HasArea {
    var area: Double { get }
}
```

这里有两个类，Circle 和Country ，这两个类都遵循HasArea 协议：

```
class Circle: HasArea {
    let pi = 3.1415927
    var radius: Double
    var area: Double { return pi * radius * radius }
    init(radius: Double) { self.radius = radius }
}
class Country: HasArea {
    var area: Double
    init(area: Double) { self.area = area }
}
```

Circle 类基于存储属性radius 用计算属性实现了area 属性要求。Country 类则直接使用存储属性实现了area 要求。这两个类都正确地遵循了HasArea 协议。

这里是一个叫做Animal 的类，它不遵循HasArea 协议：

```
class Animal {
    var legs: Int
    init(legs: Int) { self.legs = legs }
}
```

Circle 、Country 和Animal 类并不基于相同的基类。不过它们都是类，所以它们三个类型的实例都可以用于初始化储存类型为AnyObject 的数组：

```
let objects: [AnyObject] = [
    Circle(radius: 2.0),
    Country(area: 243_610),
    Animal(legs: 4)
]
```

objects 数组使用包含Circle 两个单位半径的实例、Country 以平方公里为单位英国面积实例、Animal 有四条腿实例的数组字面量初始化。

objects 数组现在可以遍历了，而且数组中每一个对象都能检查是否遵循HasArea 协议：

```
for object in objects {
    if let objectWithArea = object as? HasArea {
        print("Area is \(objectWithArea.area)")
    } else {
        print("Something that doesn't have an area")
    }
}
// Area is 12.5663708
// Area is 243610.0
// Something that doesn't have an area
```

当数组中的对象遵循HasArea 协议，as? 运算符返回的可选项就通过可选绑定赋值到一个叫做objectWithArea 的常量当中。objectWithArea 已知类型为HasArea ，所以它的area 属性可以通过类型安全的方式访问和打印。

注意使用的对象并没有通过转换过程而改变。他们仍然是Circle 、Country 和Animal 。总之，在储存在objectWithArea 常量中的那一刻，他们仅被所知为HasArea ，所以只有area 属性可以访问。

## 可选协议要求

你可以给协议定义_可选要求_，这些要求不需要强制遵循协议的类型实现。可选要求使用optional 修饰符作为前缀放在协议的定义中。可选要求允许你的代码与 Objective-C 操作。协议和可选要求必须使用@objc 标志标记。注意@objc 协议只能被继承自 Objective-C 类或其他@objc 类采纳。它们不能被结构体或者枚举采纳。

当你在可选要求中使用方法或属性是，它的类型自动变成可选项。比如说，一个(Int) -> String 类型的方法会变成((Int) -> String)? 。注意是这个函数类型变成可选项，不是方法的返回值。

可选协议要求可以在可选链中调用，来说明要求没有被遵循协议的类型实现的概率。你可以通过在调用方法的时候在方法名后边写一个问号来检查它是否被实现，比如someOptionalMethod?(someArgument) 。更多关于可选链的信息，见[可选链](https://www.cnswift.org/optional-chaining)。

下面的例子定义了一个叫做Counter 的整数计数的类，它使用一个外部数据源来提供它的增量。这个数据源通过CounterDataSource 协议定义，它有两个可选要求：

```
@objc protocol CounterDataSource {
    @objc optional func increment(forCount count: Int) -> Int
    @objc optional var fixedIncrement: Int { get }
}
```

CounterDataSource 协议定义了一个叫做increment(forCount:) 的可选方法要求以及一个叫做fixedIncrement 的可选属性要求。这些要求给Counter 实例定义了两个不同的提供合适增量的方法。

> 注意
> 
> 严格来讲，你可以写一个遵循CounterDataSource 的自定义类而不实现_任何_协议要求。反正它们都是可选的。尽管技术上来讲是可以的，但这样的话就不能做一个好的数据源了。

 

下方定义的Counter 类，有一个可选的dataSource 属性，类型是CounterDataSource? ：

```
class Counter {
    var count = 0
    var dataSource: CounterDataSource?
    func increment() {
        if let amount = dataSource?.increment?(forCount: count) {
            count += amount
        } else if let amount = dataSource?.fixedIncrement {
            count += amount
        }
    }
}
```

Counter 类在一个叫做count 的变量属性里储存当前值。Counter 类同样定义了一个叫做increment 的方法，它在每次被调用的时候增加count 属性。

increment() 方法首先通过查找自身数据源的increment(forCount:) 的实现来尝试获取增量。increment() 方法使用可选链来尝试调用increment(forCount:) ，同时传入当前count 值作为方法的唯一实际参数。

注意这里有_两_层可选链。首先，dataSource 有可能是nil ，所以dataSource 名字后边有一个问号以表示只有dataSource 不是nil 的时候才能调用incrementForCount(forCount:) 。其次，就算dataSource _确实_存在，也没有人能保证它实现了incrementForCount(forCount:) ，因为它是可选要求。所以，incrementForCount(forCount:) 没有被实现的可能也被可选链处理。incrementForCount(forCount:) 的调用只发生在incrementForCount(forCount:) 存在的情况下——也就是说，不是nil 。这就是为什么incrementForCount(forCount:) 也在名字后边写一个问号。

由于对incrementForCount(forCount:) 的调用可以两个理由中的任何一个而失败，调用返回一个_可选的Int_ 值。这就算incrementForCount(forCount:) 在CounterDataSource 中定义为返回一个非可选的Int 值也生效。尽管这里有两个可选链运算，但结果仍然封装在一个可选项中。要了解更多关于多个可选链运算的信息，见 [链的多层连接](https://www.cnswift.org/optional-chaining#spl-7)。

在increment(forCount:) 调用之后，返回的可选的Int 使用可选绑定展开到一个叫做amount 的常量中。如果可选Int 包含值——也就是说，如果委托和方法都存在，并且方法返回值——展开的amount 添加到count 存储属性，增加完成。

如果_不_能从increment(forCount:) 方法取回值——无论是由于dataSource 为空还是由于数据源没有实现increment(forCount:) ——那么increment() 方法就尝试从数据源的fixedIncrement 属性取回值。fixedIncrement 属性同样是一个可选要求，所以值是一个可选的Int 值，就算fixedIncrement 在CounterDataSource 协议的定义中被定义为非可选Int 属性。

这里是CounterDataSource 的简单实现，数据源在每次查询时返回固定值3 .它通过实现可选fixedIncrement 属性要求来实现这一点：

```
class ThreeSource: NSObject, CounterDataSource {
    let fixedIncrement = 3
}
```

你可以使用ThreeSource 的实例作为新Counter 实例的数据源：

```
var counter = Counter()
counter.dataSource = ThreeSource()
for _ in 1...4 {
    counter.increment()
    print(counter.count)
}
// 3
// 6
// 9
// 12
```

下边的代码创建了一个新的Counter 实例；设置它的数据源为新的ThreeSource 实例；并且调用计数器的increment() 方法四次。按照预期，计数器的count 属性在每次increment() 调用是增加三。

这里有一个更加复杂一点的TowardsZeroSource ，它使Counter 实例依照它当前的count 值往上或往下朝着零计数：

```
@objc class TowardsZeroSource: NSObject, CounterDataSource {
    func increment(forCount count: Int) -> Int {
        if count == 0 {
            return 0
        } else if count < 0 {
            return 1
        } else {
            return -1
        }
    }
}
```

TowardsZeroSource 类实现了CounterDataSource 协议的可选increment(forCount:) 方法并且使用count 实际参数来计算改朝哪个方向计数。如果count 已经是零，方法返回0  来表示无需继续计数。

你可以使用TowardsZeroSource 给现存的Counter 实例来从\-4 到零。一旦计数器到零，就不会再变化：

```
counter.count = -4
counter.dataSource = TowardsZeroSource()
for _ in 1...5 {
    counter.increment()
    print(counter.count)
}
// -3
// -2
// -1
// 0
// 0
```

## 协议扩展

协议可以通过扩展来提供方法和属性的实现以遵循类型。这就允许你在协议自身定义行为，而不是在每一个遵循或者在全局函数里定义。比如说，RandomNumberGenerator 协议可以扩展来提供randomBool() 方法，它使用要求的random() 方法来返回随机的Bool 值：

```
extension RandomNumberGenerator {
    func randomBool() -> Bool {
        return random() > 0.5
    }
}
```

通过给协议创建扩展，所有的遵循类型自动获得这个方法的实现而不需要任何额外的修改。

```
let generator = LinearCongruentialGenerator()
print("Here's a random number: \(generator.random())")
// Prints "Here's a random number: 0.37464991998171"
print("And here's a random Boolean: \(generator.randomBool())")
// Prints "And here's a random Boolean: true"
```

### 提供默认实现

你可以使用协议扩展来给协议的任意方法或者计算属性要求提供默认实现。如果遵循类型给这个协议的要求提供了它自己的实现，那么它就会替代扩展中提供的默认实现。

> 注意
> 
> 通过扩展给协议要求提供默认实现与可选协议要求的区别是明确的。尽管遵循协议都不需要提供它们自己的实现。有默认实现的要求不需要使用可选链就能调用。

举例来说，继承自TextRepresentable 的PrettyTextRepresentable 协议可以给它要求的prettyTextualDescription 属性提供一个默认实现来简单的返回访问textualDescription 属性的结果：

```
extension PrettyTextRepresentable  {
    var prettyTextualDescription: String {
        return textualDescription
    }
}
```

### 给协议扩展添加限制

当你定义一个协议扩展，你可以明确遵循类型必须在扩展的方法和属性可用之前满足的限制。如同 Where 分句（此处应有链接）中描述的那样，在扩展协议名字后边使用where 分句来写这些限制。比如说，你可以给Collection 定义一个扩展来应用于任意元素遵循上面TextRepresentable 协议的集合。

```
extension Collection where Iterator.Element: TextRepresentable {
    var textualDescription: String {
        let itemsAsText = self.map { $0.textualDescription }
        return "[" + itemsAsText.joined(separator: ", ") + "]"
    }
}
```

textualDescription 属性返回整个集合写在花括号里通过用逗号组合集合中每个元素的文本化表示的文本化描述。

考虑之前的Hamster 结构体，它遵循TextRepresentable 协议，Hamster 值的数组：

```
let murrayTheHamster = Hamster(name: "Murray")
let morganTheHamster = Hamster(name: "Morgan")
let mauriceTheHamster = Hamster(name: "Maurice")
let hamsters = [murrayTheHamster, morganTheHamster, mauriceTheHamster]
```

由于Array 遵循Collection 并且数组的元素遵循TextRepresentable 协议，数组可以使用textualDescription 属性来获取它内容的文本化表示：

```
print(hamsters.textualDescription)
// Prints "[A hamster named Murray, A hamster named Morgan, A hamster named Maurice]"
```

> 注意
> 
> 如果遵循类型满足了为相同方法或者属性提供实现的多限制扩展的要求，Swift 会使用最匹配限制的实现。
