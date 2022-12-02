const line_height = 1.4

function createTextarea (value = '') {
    const textarea = $("<textarea>", {class: "column", style: 'height: ' + ((value.match(/\n/g) || []).length + 1) * line_height + 'em;'}).get(0)
    textarea.value = value
    document.getElementsByTagName("main")[0].appendChild(textarea)
}

// textareaのheightの自動調整（cssのmin-heightで最低値を制御）
$("main").on('keydown', "textarea", function (e) {
    if (e.key == "Enter") {
        this.style.height = Number(this.style.height.slice(0, -2)) + line_height + 'em'
    }
})

// textareaのheightの自動調整　Backspace＆コピペ対応用
$("main").on('keyup', "textarea", function () {
    this.style.height = ((this.value.match(/\n/g) || []).length + 1) * line_height + 'em'
})

// 最後尾に何か入力された時、最後尾にtextareaを追加
$("main").on('keyup', "textarea", function () {
    if (this == $("textarea").last().get(0) && this.value != '') {
        createTextarea()
    }
})

// 最後尾とその次のtextareaが両方空白の時、最後尾を消す
$("main").on('keyup', "textarea", function () {
    while ($("textarea").get(-1).value == '' &&
        $("textarea").get(-2).value == '') {
        $("textarea").last().remove()
    }
})

// セーブ
$("main").on('keyup', function () {
    const Memo2 = []
    $("textarea").each(function () {
        Memo2.push(this.value)
    })
    localStorage.setItem("Memo2", JSON.stringify({...Memo2}))
})

// localStorageから初期化
$(window).on('load', function () {
    const Memo2 = Object.values(JSON.parse(localStorage.getItem("Memo2") || '{"0":""}'))
    for (const value of Memo2) {
        createTextarea(value)
    }
})