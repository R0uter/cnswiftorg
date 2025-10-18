---
title: "并发"
date: 2021-06-21
sidebar_position: 22
---

Swift 为写异步和并行代码提供了内置的结构化方式。_异步_代码代码可以挂起并稍后继续，尽管同一时间只能有一个程序执行。在你的程序中挂起和继续代码能让它在短时间操作如更新 UI 界面的同时执行长时间任务，比如通过网络获取数据或者处理文件。_并行_代码意味着多个代码同时执行——比如说，一个拥有四核处理器的电脑能够同时运行四段代码，每个核心处理一个任务；它会挂起等待外部系统的任务，并且让这类代码更容易以内存安全的方式实现。

并行或者异步代码带来计划弹性，但也伴随着以复杂度的提升作为代价。Swift 允许你以一种编译时检测的方式表达你的意图——比如说，你可以使用行为体来安全的访问可变状态。总之，给缓慢或者充满 Bug 的代码添加并发并不能保证它就一定能变快或者结果正确。事实上，添加并发还会让代码更难排错。总之，在需要并发的代码中使用 Swift 的语言级并发支持意味着 Swift 能帮助你在编译时捕捉问题。

下文将使用并发来指代通常意义上的异步和并行的组合。

> 注意
> 
> 如果你之前写过并发代码，你可能习惯了使用线程。Swift 的并发模型是构建在线程之上的，但你不会直接与它们互动。在 Swift 中异步函数能让出线程，允许另一个异步函数在第一个函数阻塞时在这个线程执行。

尽管不用 Swift 语言支持也能写并发代码，那代码就有点难读。比如说，下面的代码下载照片名称列表，然后下载列表中第一个照片，然后把照片展示给用户：

```
listPhotos(inGallery: "Summer Vacation") { photoNames in
    let sortedNames = photoNames.sorted()
    let name = sortedNames[1]
    downloadPhoto(named: name) { photo in
        show(photo)
    }
}
```

就算是这么一个简单的情况，由于代码需要写成一系列的回调，你最终写成内嵌闭包，一堆复杂的内嵌代码使程序变得臃肿。

## 定义和调用异步函数

_异步函数_和_异步方法_是一种特殊的能在执行一部分时被挂起函数或者方法。这与传统不同，同步函数和方法要么执行到结束，要么抛出错误，或者不返回内容。异步函数或者方法还是会做这些行为之一，但它还可以在等待别的东西的时候暂停执行。在异步函数或方法内部，你可以标记哪里可以挂起。

要标记对应函数或者方法是异步的，你在声明中形式参数的后面使用 async  关键字， 和你使用 throw  关键字一样。如果函数或者方法返回值，就把 async  写在返回箭头（\-> ）之前。比如说，这里是你可能写的在相册中获取照片名称方法：

```
func listPhotos(inGallery name: String) async -> [String] {
    let result = // ... some asynchronous networking code ...
    return result
}
```

对于那些又抛出错误又异步的函数或者方法，你把 async  写在 throws  前面。

当调用异步方法时，执行会挂起直到那个方法返回。你在调用前使用 await 来标记可能会挂起的位置。就像是在调用会抛出错误的函数时写 try 一样，用来标记如果有错误就会在这里改变程序执行流程。在异步方法内部，执行的流程_只_会在你调用另一个异步方法时挂起——挂起不会隐含或者抢先——也就是说所有可能的挂起位置都会用 await 标记。

比如说，下面的代码获取相册中所有照片的名字然后显示第一个图片：

```
let photoNames = await listPhotos(inGallery: "Summer Vacation")
let sortedNames = photoNames.sorted()
let name = sortedNames[1]
let photo = await downloadPhoto(named: name)
show(photo)
```

由于listPhotos(inGallery:) 和downloadPhoto(named:) 都需要网络请求，它们可能会需要相对长的时间才能完成。通过在返回箭头前写 async 让它们都异步执行，让 App 剩下的代码在等待照片完成前保持运行。

来理解上面代码中并发的本质，这里是执行顺序的一种可能：

1. 代码开始从第一行运行，直到第一个 await。它调用listPhotos(inGallery:) 函数并且在等待函数返回时挂起执行；
2. 当这个代码执行被挂起，同一程序的其他并发代码继续运行。比如说，可能有个后台任务持续更新相册中的新照片。那个代码同样自行直到下一个挂起点，用 await 标记，或者直到它完成；
3. listPhotos(inGallery:) 返回后，这段代码继续从这个位置执行。它会把返回的值赋给photoNames ；
4. 定义sortedNames 和name 的代码就是普通同步代码。因为没有标记为await ，也没有其他可能的挂起点；
5. 下一个await 标记在downloadPhoto(named:) 函数调用处。这段代码再次暂停执行，直到函数返回，给其他并发代码执行的机会；
6. 在downloadPhoto(named:) 返回后，它返回的值赋给了photo 然后作为实际参数传给show(\_:) 。

你的代码中使用await 标记的可能挂起点表明了当前这段代码可能会在等待异步函数或方法返回时暂停执行。这也被称作_线程让步_，因为 Swift 暂停了当前线程中正在执行的代码，然后在这个线程中执行其他代码。由于带有await 的代码需要能够挂起执行，只有在你程序中一些特定的地方能够调用异步函数或方法：

- 异步函数、方法或属性的代码段中的代码；
- 在标记了@main 的结构体、类或者枚举的静态main() 方法中的代码；
- 如同下文非结构化并发所述，在分离的子任务中的代码。

你可以通过调用Task.yield() 方法来显式插入挂起点。

```
func generateSlideshow(forGallery gallery: String) async {
    let photos = await listPhotos(inGallery: gallery)
    for photo in photos {
        // ... render a few seconds of video for this photo ...
        await Task.yield()
    }
}
```

假设渲染视频的代码是同步的，那么它就不包含任何挂起点。渲染视频的工作也可能需要很长时间。不过，你可以定期调用 Task.yield()  来显式添加挂起点。通过这种方式构建长时间运行的代码，Swift 可以在完成这项任务和让程序中的其他任务取得进展之间取得平衡。

Task.sleep(for:tolerance:clock:) 方法在编写简单代码以了解并发如何工作时非常有用。该方法至少在给定的时间内暂停当前任务。下面是使用 sleep(for:tolerance:clock:)  来模拟等待网络操作的 listPhotos(inGallery:)  函数的一个版本：

```
func listPhotos(inGallery name: String) async throws -> [String] {
    try await Task.sleep(for: .seconds(2))
    return ["IMG001", "IMG99", "IMG0404"]
}
```

上面代码中的 listPhotos(inGallery:)  版本是异步的也是可抛出的，因为调用 Task.sleep(until:tolerance:clock:)  会抛出错误。当调用此版本的 listPhotos(inGallery:)  时，需要同时编写 try  和 await ：

```
let photos = try await listPhotos(inGallery: "A Rainy Weekend")
```

异步函数与抛掷函数有一些相似之处： 当你定义异步函数或抛掷函数时，用 async  或 throws  标记，并用 await  或 try  标记对该函数的调用。异步函数可以调用另一个异步函数，就像抛掷函数可以调用另一个抛掷函数一样。

不过，这两者之间有一个非常重要的区别。您可以用do-catch  代码块封装抛出代码以处理错误，或者使用 Result  来存储错误，以便其他地方的代码处理它。通过这些方法，您可以从非抛出代码中调用抛出函数。例如：

```
func getRainyWeekendPhotos() async -> Result<[String]> {
    return Result {
        try await listPhotos(inGallery: "A Rainy Weekend")
    }
}
```

相比之下，没有安全的方法来封装异步代码以便您可以从同步代码中调用它并等待结果。Swift 标准库故意省略了这种不安全的功能——自己尝试实现它可能会导致潜在的竞用、线程问题和死锁等问题。在现有项目中添加并发代码时，应自上而下进行。具体来说，首先转换最顶层的代码以使用并发功能，然后开始转换它所调用的函数和方法，一次转换一层项目架构。自下而上的方法是行不通的，因为同步代码永远无法调用异步代码。

## 异步序列

listPhotos(inGallery:) 函数在前面章节中等数组的所有元组都准备好后一次性异步返回了整个数组，另一个实现是使用_异步序列_每次等待集合中的一个元素。这里是一个遍历异步序列的例子：

```
import Foundation

let handle = FileHandle.standardInput
for try await line in handle.bytes.lines {
    print(line)
}
```

对于传统for-in 循环来说，上面的例子在它后面写await 。就像你调用异步函数或者方法一样，用await 表示一个可能的挂起点。当等待下一个元素可用时，for-await-in 循环会潜在的在每一次遍历前挂起。

与你可以在for-in 循环中使用你自己的类型，只要添加Sequence 协议遵循即可一样，在for-await-in 循环中使用你自己的类型，只要添加AsyncSequence 协议遵循即可。

### 并行调用异步方法

使用await 调用异步方法一次只能运行一段代码。当异步代码运行时，调用者在移动到下一行代码前等待代码执行完成。比如说，从相册获取前三张照片，你可能会等待三个downloadPhoto(named:) 调用，如下边这样：

```
let firstPhoto = await downloadPhoto(named: photoNames[0])
let secondPhoto = await downloadPhoto(named: photoNames[1])
let thirdPhoto = await downloadPhoto(named: photoNames[2])

let photos = [firstPhoto, secondPhoto, thirdPhoto]
show(photos)
```

这个实现有个重要的缺点：尽管下载是异步的，能在处理过程中允许其他任务进行，但一次只有一个downloadPhoto(named:) 运行。每个照片必须在前一个完全下载完才能开始下载。总之，这些操作是不需要等待的——每一个照片都能独立下载，甚至是同时下载。

要调用异步方法并允许它并行执行，在你用let 定义常量前写async ，然后每次你使用常量时写await 。

```
async let firstPhoto = downloadPhoto(named: photoNames[0])
async let secondPhoto = downloadPhoto(named: photoNames[1])
async let thirdPhoto = downloadPhoto(named: photoNames[2])

let photos = await [firstPhoto, secondPhoto, thirdPhoto]
show(photos)
```

这个例子中，三个downloadPhoto(named:) 调用不需要等待前一个完成就能启动。如果系统资源足够的话，他们可同时运行。这些函数调用都没有用await 标记，是因为它们不需要挂起来等待函数结果。相反，执行会一直持续到photos 定义的地方——在那里，程序需要这些异步调用的结果，所以你写await 来暂停执行知道所有三个照片都下载完成。

这里是对这两种不同实现的理解：

- 当代码中下一行依赖函数结果时，使用await 调用异步函数。这会使工作顺序执行；
- 当你不需要结果直到后续代码才用时，使用async-let 调用异步函数。这会使工作并行执行；
- 在以上两种情况中，你使用await 来标记可能的挂起点，表示如果需要的话执行会暂停，直到异步函数返回。

你可以在同一个代码中混用这两种实现方法。

## 任务和任务组

_任务_是可以作为你程序一部分异步运行的工作单位。所有异步代码都会作为某任务的一部分运行。任务本身一次只做一件事，但当你创建多个任务时，Swift 可以安排它们同时运行。

上文中描述的async-let 语法会为隐式地为你创建一个子任务——这个语法在你已经了解你的程序需要运行什么任务时很好用。你还可以创建任务组并给这个组添加任务，这会给你更多控制优先级以及撤销操作能力，并且允许你创建动态数量的任务。

任务使用继承管理。每一个任务组中的任务都有相同的父任务，每一个任务都可以有子任务。由于任务和任务组之间的明确关系，这个实现叫做_结构化并发_。任务之间显式的父-子关系有诸多好处：

- 在父任务中，你不会忘记等待子任务完成；
- 当为子任务设置更高的优先级时，父任务的优先级会自动提升；
- 取消父任务时，其每个子任务也会自动取消；
- 任务本地值会自动且有效地传播到子任务。

这里有另一个版本的代码来下载任意数量照片：

```
await withTaskGroup(of: Data.self) { group in
    let photoNames = await listPhotos(inGallery: "Summer Vacation")
    for name in photoNames {
        group.addTask {
            return await downloadPhoto(named: name)
        }
    }

    for await photo in group {
        show(photo)
    }
}
```

上面的代码创建了一个新的任务组，然后创建子任务来下载图库中的每张照片。在条件允许的情况下，Swift 会同时运行多个这些任务。一旦子任务完成下载，就会显示该照片。子任务完成的顺序没有保证，因此该图库中的照片可以按任何顺序显示。

> 注意
> 
> 如果下载照片的代码可能会抛出错误，你可以调用 withThrowingTaskGroup(of:returning:body:)  来代替。

在上面的代码中，每张照片都是下载后再显示的，因此任务组不会返回任何结果。对于返回结果的任务组，你可以添加代码，在传递给 withTaskGroup(of:returning:body:)  的闭包中累积处理结果。

```
let photos = await withTaskGroup(of: Data.self) { group in
    let photoNames = await listPhotos(inGallery: "Summer Vacation")
    for name in photoNames {
        group.addTask {
            return await downloadPhoto(named: name)
        }
    }

    var results: [Data] = []
    for await photo in group {
        results.append(photo)
    }

    return results
}
```

与上一示例一样，本示例为每张照片创建了一个子任务来下载照片。与前一个示例不同的是，for-await-in  循环等待下一个子任务完成，将该任务的结果追加到结果数组中，然后继续等待，直到所有子任务都完成。最后，任务组将下载的照片数组作为总结果返回。

### 任务取消

Swift 并发使用合作取消模型。每个任务都会在执行过程中的适当时刻检查自己是否已被取消，并对取消做出适当的响应。根据任务正在执行的工作，对取消做出响应通常意味着以下情况之一：

- 抛出错误，比如说CancellationError ；
- 返回nil 或者空集合；
- 返回部分完成的任务。

如果图片较大或网络速度较慢，下载图片可能需要很长时间。为了让用户停止这项工作，而无需等待所有任务完成，任务需要检查是否取消，如果取消则停止运行。任务有两种方法可以做到这一点：调用 Task.checkCancellation()  方法或读取 Task.isCancelled  属性。如果任务被取消，调用 checkCancellation() 会抛出错误；抛出错误的任务会将错误传播到任务之外，停止任务的所有工作。这样做的好处是易于实现和理解。如果想获得更大的灵活性，可以使用 isCancelled  属性，在停止任务的同时执行清理工作，如关闭网络连接和删除临时文件。

```
let photos = await withTaskGroup(of: Optional<Data>.self) { group in
    let photoNames = await listPhotos(inGallery: "Summer Vacation")
    for name in photoNames {
        group.addTaskUnlessCancelled {
            guard isCancelled == false else { return nil }
            return await downloadPhoto(named: name)
        }
    }

    var results: [Data] = []
    for await photo in group {
        if let photo { results.append(photo) }
    }
    return results
}
```

上面的代码相比前一个例子做了些许改动：

- 每个任务都是使用 TaskGroup.addTaskUnlessCancelled(priority:operation:)  方法添加的，以避免取消任务后开始新的工作；
- 每个任务在开始下载照片前都会检查是否取消。如果已取消，则任务返回 nil 。
- 最后，任务组在收集结果时会跳过 nil  值。通过返回 nil  来处理取消，意味着任务组可以返回部分结果——取消时已经下载的照片——而不是丢弃已完成的工作。

对于那些需要立即通知取消的工作，使用Task.withTaskCancellationHandler(operation:onCancel:) 方法，举例：

```
let task = await Task.withTaskCancellationHandler {
    // ...
} onCancel: {
    print("Canceled!")
}

// ... some time later...
task.cancel()  // Prints "Canceled!"
```

使用取消处理程序时，任务取消仍然是合作性的： 任务要么运行完成，要么检查是否取消并提前停止。由于任务在取消处理程序启动时仍在运行，因此应避免在任务和取消处理程序之间共享状态，否则会造成竞用问题。

### 非结构化并发

除了上文描述的结构化实现并发外，Swift 也提供了访问结构化并发。与任务是任务组一部分不同，_非结构化任务_没有父任务。你拥有完整灵活性去管理非结构化任务，随便你程序需要，但你同样要全部负责正确性。要创建一个在当前行为体下运行的非结构化任务，调用async(priority:operation:) 函数。要创建一个非当前行为体的非结构化任务，更准确的说法是_分离任务_，调用asyncDetached(priority:operation:) 。这两个方法都返回任务引用允许你与任务交互——比如说，等待执行结果或者是撤销它。

```
let newPhoto = // ... some photo data ...
let handle = async {
    return await add(newPhoto, toGalleryNamed: "Spring Adventures")
}
let result = await handle.get()
```

更多关于分离任务的信息，见 [Task.Handle](http://Task.Handle)。

## 行为体

和类相似，行为体是引用类型，所以[类是引用类型](https://www.cnswift.org/classes-and-structures#spl-7)中描述的那样值类型和引用类型的不同也应用于行为体，与类相同。与类不同的是，行为体一次只允许一个任务访问他们的可变状态，这就使得同一个行为体在多任务代码中也可安全访问。比如，这里有一个记录气温的行为体：

```
actor TemperatureLogger {
    let label: String
    var measurements: [Int]
    private(set) var max: Int

    init(label: String, measurement: Int) {
        self.label = label
        self.measurements = [measurement]
        self.max = measurement
    }
}
```

使用actor 关键字引入行为体，跟着是它写在一对花括号中的定义。TemperatureLogger 行为体拥有其他行为体外代码可以访问的属性，并且限制了max 属性只能是行为体内代码才能更新最大值。

使用结构体和类相同的初始化语法来初始化行为体。当你访问行为体的属性或方法时，使用 await  来标记潜在的暂停点，比如：

```
let logger = TemperatureLogger(label: "Outdoors", measurement: 25)
print(await logger.max)
// Prints "25"
```

在这个例子中，访问logger.max 是一个可能的挂起点。由于行为体同时只允许一个任务访问可变状态，如果代码中其他任务正在与 logger 交互，这个代码就会在访问属性时挂起。

相反，行为体中的代码在访问行为体的属性时不写await 。比如说，这里有一个方法TemperatureLogger 更新温度：

```
extension TemperatureLogger {
    func update(with measurement: Int) {
        measurements.append(measurement)
        if measurement > max {
            max = measurement
        }
    }
}
```

update(with:) 已经是在行为体中运行的了，所以它在访问比如max 时不需要 await 关键字。这个方法还表现了行为体同一时间只允许一个任务与其可变状态交互的原因之一：某些对行为体的更新会暂时破坏不变性。TemperatureLogger 行为体会保存温度的列表以及最高温度，然后在你记录新记录时更新最高温度。在更新的过程中，在追加新数据但更新max 之前，logger 处在一个暂时不一致状态。阻止多个任务同时交互一个实例会避免下面这种情况：

1. 你的代码调用update(with:) 方法，它首先更新measurements ；
2. 在你代码能更新max 之前，某些地方读了最大值以及温度列表；
3. 你的代码更新max ，完成执行。

在这个情况中，某处代码就会督导不正确的信息，因为它对行为体的访问是与update(with:) 调用交错进行的，此时数据是暂时无效的。你可以在使用 Swift 行为体时避免这个问题，因为它们同一时间只允许一个任务进行，并且由于代码只会在用 await  标记的位置挂起。由于update(with:) 不包含挂起点，其他任何代码都不能在更新的过程中访问数据。

如果你在行为体外访问这些属性，比如你像访问类实例那样，你就会得到编译时错误；例如：

```
print(logger.max)  // Error
```

不写 await 访问 logger.max 会失败是因为行为体的属性是这个行为体隔离本地状态的一部分。Swift 保证行为体内的代码才能访问行为体的本地状态。这个保证就是所谓的_行为体隔离_。

## 可发送类型

任务和行为体可以让你将程序拆分成能够安全并发执行的小部分。在一个任务或者行为体实例中，包含可变状态的那部分程序，比如变量和属性，就被叫做_并发域_。某些种类的数据不能在并发域之间共享，因为那些数据包含了可变状态，却又没有针对重叠访问进行防护。

可以在并发域之间进行共享的类型，就是所谓的_可发送类型_。举例来说，它可以在调用行为体方法时作为实际参数传递，或者作为任务的结果。前面章节提中的例子并没有讨论可发送性是因为那些例子都使用了简单的值类型，他们在迸发域之间传递时都是安全的。比如说，一个包含可变属性且又不串行访问那些属性，当你把那个类的实例传递给不同任务时就会导致不可预测和不正确的结果。

你可以通过声明遵循Sendable 协议来标记某类型是可发送的。那个协议没有任何代码需求，不过它确实有一些 Swift 强制的合成需求。通常，有三种方法让一个类型可发送：

- 类型是值类型，并且它的可变状态是由其他可发送数据——比如，有存储属性的可发送的结构体或者可发送的有关联值的枚举。
- 类型不包含任何可变状态，并且其自身的不可变状态由其他可发送数据组成——比如，只包含可读属性的结构体或者类。
- 有代码确保其自身可变状态的类，比如标记了@MainActord 的类或者在特定线程或队列中串行访问自身属性的类。

详细的合成需求见 Sendable 协议引用。

有些类型是一定可发送的，比如只有可发送属性的结构体和只有可发送关联值的枚举。例如：

```
struct TemperatureReading: Sendable {
    var measurement: Int
}

extension TemperatureLogger {
    func addReading(from reading: TemperatureReading) {
        measurements.append(reading.measurement)
    }
}

let logger = TemperatureLogger(label: "Tea kettle", measurement: 85)
let reading = TemperatureReading(measurement: 45)
await logger.addReading(from: reading)
```

由于TemperatureReading 是一个只包含可发送属性的结构体且没有标记为public 或者@usableFromInline ，它是隐式可发送的。这里是一个隐含遵循Sendable 协议版本的结构体：

```
struct TemperatureReading {
    var measurement: Int
}
```

要显式标记类型不是可发送的，就重写隐式遵循 Sendable  协议，使用扩展：

```
struct FileDescriptor {
    let rawValue: CInt
}

@available(*, unavailable)
extension FileDescriptor: Sendable { }
```

上面的代码显示了 POSIX 文件描述符的部分封装。尽管文件描述符接口使用整数来识别打开的文件并与之交互，而且整数值是可发送的，但文件描述符并不能安全地跨并发域发送。

在上面的代码中，FileDescriptor  是一个符合隐式可发送标准的结构。然而，扩展使其与 Sendable  的一致性不可用，从而阻止了该类型变成可发送的。
