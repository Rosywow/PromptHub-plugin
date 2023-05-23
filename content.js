// 创建按钮
var button = document.createElement("button");
button.textContent = "my prompt";
button.id = "request-code-btn";
button.style.padding = "2px";
button.style.border = "none";
button.style.borderRadius = "20px";
button.style.color = "#fff";
button.style.backgroundColor = "#6e6e80";
button.style.fontSize = "10px";
button.style.fontWeight = "150";
button.style.marginBottom = "10px";
button.style.width = "80px";

// 找到目标元素
var targetElement = document.querySelector(".flex.flex-col.w-full.py-2.flex-grow.md\\:py-3.md\\:pl-4.relative.border.border-black\\/10.bg-white.dark\\:border-gray-900\\/50");
const textarea = document.querySelector('textarea[tabindex="0"]');
// 插入按钮到指定的DOM元素前
targetElement.parentNode.insertBefore(button, targetElement);

// 监听按钮点击事件
button.addEventListener("click", function () {
    textarea.value = "";
    // 创建弹窗
    var modal = document.createElement("div");
    modal.style.width = "500px";
    modal.style.height = "550px";
    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.backgroundColor = "#fff";
    modal.style.border = "1px solid #000";
    modal.style.borderRadius = "5px";
    modal.style.overflow = "hidden"; // 添加溢出隐藏属性,防止菜单栏的内容溢出弹窗

    // 创建菜单栏
    var menuBar = document.createElement("div");
    menuBar.style.backgroundColor = "#f0f0f0";
    menuBar.style.padding = "10px";
    menuBar.style.display = "flex";

    // 创建菜单项 - 我的 prompt
    var menuItem1 = document.createElement("div");
    menuItem1.textContent = "我的 prompt";
    menuItem1.style.textAlign = "center";
    menuItem1.style.cursor = "pointer";
    menuItem1.style.flexGrow = 1;

    // 创建菜单项 - 存储 prompt
    var menuItem2 = document.createElement("div");
    menuItem2.textContent = "存储 prompt";
    menuItem2.style.textAlign = "center";
    menuItem2.style.cursor = "pointer";
    menuItem2.style.flexGrow = 1;

    // 将菜单项添加到菜单栏
    menuBar.appendChild(menuItem1);
    menuBar.appendChild(menuItem2);

    // 创建弹窗内容区域
    var content = document.createElement("div");
    content.style.padding = "10px";

    // 添加菜单栏和内容区域到弹窗
    modal.appendChild(menuBar);
    modal.appendChild(content);

    // 创建删除按钮
    var closeButton = document.createElement("button");
    closeButton.textContent = "X";
    closeButton.style.position = "absolute";
    closeButton.style.top = "5px";
    closeButton.style.right = "5px";
    closeButton.style.border = "none";
    closeButton.style.backgroundColor = "transparent";
    closeButton.style.fontSize = "16px";
    closeButton.style.fontWeight = "bold";
    closeButton.style.cursor = "pointer";

    // 监听删除按钮点击事件
    closeButton.addEventListener("click", function () {
        document.body.removeChild(modal);
    });

    // 添加删除按钮到弹窗
    modal.appendChild(closeButton);


    // 监听菜单项点击事件
    menuItem1.addEventListener("click", function () {
        // 获取数据
        chrome.storage.local.get(['myPromptData'], function (result) {
            if (chrome.runtime.lastError) {
                console.log('获取数据时发生错误: ' + chrome.runtime.lastError.message);
                return;
            }

            var data = result.myPromptData;
            content.innerHTML = ""; // 初始化内容为空字符串

            // 检查data是否存在且是否为数组
            if (data && Array.isArray(data)) {
                data.forEach(function (item, index) {
                    // 创建一个新的<a>元素，设置其文本为input1Value，并添加到content中
                    var a = document.createElement('a');
                    a.textContent = index + 1 + ". " + item.title;
                    a.href = "#";

                    // 创建修改按钮
                    // var editButton = document.createElement('button');
                    // editButton.style.marginLeft = "330px";
                    // editButton.textContent = '修改';
                    // editButton.addEventListener("click", function (event) {
                    //     event.stopPropagation();
                    //     // 这里可以添加修改按钮点击事件的处理代码
                    //     console.log("You clicked edit for " + item.title);
                    // });
                    // a.appendChild(editButton);

                    // 创建删除按钮
                    var deleteButton = document.createElement('button');
                    deleteButton.style.marginLeft = "50px";
                    deleteButton.textContent = '删除';
                    deleteButton.addEventListener("click", function (event) {
                        event.stopPropagation();
                        // 删除对应的元素
                        data.splice(index, 1);
                        // 存储更新后的数据
                        chrome.storage.local.set({ 'myPromptData': data }, function () {
                            if (chrome.runtime.lastError) {
                                console.log('存储数据时发生错误: ' + chrome.runtime.lastError.message);
                                return;
                            }
                            console.log("You clicked delete for " + item.title);
                            // 从页面中移除被删除的元素
                            a.parentNode.removeChild(a);
                        });
                    });
                    a.appendChild(deleteButton);

                    a.addEventListener("click", function () {
                        // 这里可以添加点击事件的处理代码
                        console.log("You clicked on " + item.title);
                        textarea.value = item.prompt;
                        closeButton.click();
                    });

                    content.appendChild(a);

                    // 添加一个换行符，以便下一个元素可以显示在新的一行
                    content.appendChild(document.createElement('br'));
                });
            }
        });
    });


    menuItem2.addEventListener("click", function () {
        // 清空当前内容区域
        content.innerHTML = "";

        // 创建两个输入框
        var input1 = document.createElement("textarea");
        var input2 = document.createElement("textarea");
        input1.style.display = "block";
        input2.style.display = "block";
        input1.style.marginBottom = "10px";
        input2.style.marginBottom = "10px";
        input1.style.border = "1px solid black"; // 设置输入框边框颜色为黑色
        input2.style.border = "1px solid black"; // 设置输入框边框颜色为黑色
        input1.style.width = "300px"; // 设置输入框宽度
        input2.style.width = "300px"; // 设置输入框宽度
        input1.style.height = "80px"; // 设置输入框高度
        input2.style.height = "180px"; // 设置输入框高度
        input1.placeholder = "title"; // 设置第一个输入框的 placeholder
        input2.placeholder = "my prompt"; // 设置第二个输入框的 placeholder

        // 创建保存按钮
        var saveButton = document.createElement("button");
        saveButton.textContent = "保存";
        saveButton.style.padding = "2px";
        saveButton.style.border = "none";
        saveButton.style.borderRadius = "20px";
        saveButton.style.color = "#fff";
        saveButton.style.backgroundColor = "#6e6e80";
        saveButton.style.fontSize = "10px";
        saveButton.style.fontWeight = "150";
        saveButton.style.marginTop = "10px";
        saveButton.style.width = "80px";


        // 创建容器 div
        var container = document.createElement("div");
        container.style.height = "400px";
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.alignItems = "center";
        container.style.justifyContent = "center"; // 垂直居中
        container.style.textAlign = "center";

        // 添加文本、输入框和保存按钮到容器
        container.appendChild(input1);
        container.appendChild(input2);
        container.appendChild(saveButton);

        // 添加容器到内容区域
        content.appendChild(container);

        // 保存按钮的点击事件监听，保存数据
        saveButton.addEventListener("click", function () {
            var title = input1.value;
            var prompt = input2.value;

            if (title !== "" && prompt !== "") {
                // 创建要保存的数据对象
                var newData = {
                    title: title,
                    prompt: prompt
                };

                // 先获取旧的数据
                chrome.storage.local.get(['myPromptData'], function (result) {
                    if (chrome.runtime.lastError) {
                        console.log('获取数据时发生错误: ' + chrome.runtime.lastError.message);
                        return;
                    }

                    var data = result.myPromptData;

                    // 如果数据为空或者不是数组，创建一个空数组
                    if (!data || !Array.isArray(data)) {
                        data = [];
                    }

                    // 把新数据推入数组
                    data.push(newData);

                    // 再保存数据
                    chrome.storage.local.set({ myPromptData: data }, function () {
                        if (chrome.runtime.error) {
                            console.log("保存数据时发生了错误。");
                            alert("保存数据时发生了错误。");
                        } else {
                            console.log("数据已成功保存。");
                            input1.value = "";
                            input2.value = "";
                            alert("数据已成功保存。");
                        }
                    });
                });
            } else {
                alert("请输入完整的内容!");
            }
        });


    });





    // 将弹窗添加到页面
    document.body.appendChild(modal);



});
