/*$("textarea.column").on('keyup', function () {
    // \nを検索して['\n', '\n', '\n', '\n']を返す。0個の時はnullを返してlengthがエラーになるので、nullの時は[]を返すようにする。
    const n_num = (this.value.match(/\n/g) || []).length
    //this.style.height = (n_num + 1) + 'em'
    setTimeout(() => {
        this.style.height = (n_num + 1) + 'em'
    }, 0)
})*/
$("textarea.column").each(function () {
    this.style.height = (this.value.match(/\n/g) || []).length + 1 + 'em'
})
$("textarea.column").on('keydown', function (e) {
    if (e.key == "Enter") {
        this.style.height = Number(this.style.height.slice(0, -2)) + 1 + 'em'
    }
    else if (e.key == "Backspace" && this.value.slice(-1) == '\n') {
        this.style.height = Number(this.style.height.slice(0, -2)) - 1 + 'em'
    }
})