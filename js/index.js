$(function () {
    retrieveData();
    createEvent();
})

//create new list
function createList(text, checked, opacity) {
    return $("<li/>").css("opacity", opacity).append($("<div/>", { class: "section-list-head" }).append(
        $("<div/>", { class: "section-list-decoration" }),
        $("<input/>", { type: "checkbox" }).prop("checked", checked)),
        $("<div/>", { class: "section-list-middle", text: text }),
        $("<div/>", { class: "section-list-last" }).append(
            $("<div/>", { class: "section-list-delete" }).append(
                $("<div/>", { class: "section-list-delete-circle" })
            )
        ))
}

function createEvent() {
    //input new task
    $(".header-content-input").on("keydown", function (e) {
        if (e.keyCode == 13) {
            var task = $(this).val();

            if (task != "") {
                addDoingData(task)
                $(".doing-section-list").prepend(createList(task, false, 1));
                $(this).val("")
                setDoingRecord(getDoingListLength());
            }
        }
    })

    //delete task
    $(".content").on("mouseenter", ".section-list-delete", function () {
        $(this).css({
            border: "2px solid red"
        })
        $(this).children(".section-list-delete-circle").css({
            backgroundColor: "red"
        })
    })

    $(".content").on("mouseleave", ".section-list-delete", function () {
        $(this).css({
            border: "2px solid #cccccc"
        })
        $(this).children(".section-list-delete-circle").css({
            backgroundColor: "#cccccc"
        })
    })

    $(".doing-section-list").on("click", ".section-list-delete", function () {
        var index = getIndexOfElement(".doing-section-list", 'section-list-delete', this);

        deleteDoingData(index);
        setDoingRecord(getDoingListLength());

        $(this).parent().parent().remove();
    })

    $(".done-section-list").on("click", ".section-list-delete", function () {
        var index = getIndexOfElement(".done-section-list", 'section-list-delete', this);

        deleteDoneData(index);
        setDoneRecord(getDoneListLength());

        $(this).parent().parent().remove();
    })

    //toggle doing list
    $(".doing-section-list").on("change", "input[type='checkbox']", function () {
        if ($(this).prop("checked") == true) {
            var index = getIndexOfElement(".doing-section-list", "input[type='checkbox']", this);

            var text = getDoingData(index).text;

            deleteDoingData(index);

            addDoneData(text)

            $(this).parent().parent().remove();
            $(".done-section-list").prepend(createList(text, true, 0.5))

            setDoingRecord(getDoingListLength());

            setDoneRecord(getDoneListLength());
        }
    })

    //toggle done list
    $(".done-section-list").on("change", "input[type='checkbox']", function () {
        if ($(this).prop("checked") == false) {
            var index = getIndexOfElement(".done-section-list", "input[type='checkbox']", this);

            var text = getDoneData(index).text;

            deleteDoneData(index);

            addDoingData(text)

            $(this).parent().parent().remove();
            $(".doing-section-list").prepend(createList(text, false, 1))

            setDoingRecord(getDoingListLength());

            setDoneRecord(getDoneListLength());
        }
    })
}

function retrieveData() {
    //localStorage.clear();
    if (localStorage.getItem("doing-list") == null) {
        localStorage.setItem("doing-list", JSON.stringify([]))
    }

    if (localStorage.getItem("done-list") == null) {
        localStorage.setItem("done-list", JSON.stringify([]))
    }

    var Data_doing = JSON.parse(localStorage.getItem("doing-list"));
    var Data_done = JSON.parse(localStorage.getItem("done-list"));

    for (var i = 0; i < Data_doing.length; i++) {
        var text = getDoingData(i).text;
        $(".doing-section-list").append(createList(text, false, 1))
    }

    for (var i = 0; i < Data_done.length; i++) {
        var text = getDoneData(i).text;
        $(".done-section-list").append(createList(text, true, 0.5))
    }

    setDoingRecord(getDoingListLength());

    setDoneRecord(getDoneListLength());

}

function addDoingData(text) {
    var Data = JSON.parse(localStorage.getItem("doing-list"));
    Data.unshift({ text: text });
    localStorage.setItem("doing-list", JSON.stringify(Data))
    console.log(JSON.parse(localStorage.getItem("doing-list")))
}

function deleteDoingData(index) {
    var Data = JSON.parse(localStorage.getItem("doing-list"));
    Data.splice(index, 1);
    localStorage.setItem("doing-list", JSON.stringify(Data))
    console.log(JSON.parse(localStorage.getItem("doing-list")))
}

function getDoingData(index) {
    var Data = JSON.parse(localStorage.getItem("doing-list"));
    console.log(Data);
    return Data[index];
}

function addDoneData(text) {
    var Data = JSON.parse(localStorage.getItem("done-list"));
    Data.unshift({ text: text });
    localStorage.setItem("done-list", JSON.stringify(Data))
    console.log(JSON.parse(localStorage.getItem("done-list")))
}

function deleteDoneData(index) {
    var Data = JSON.parse(localStorage.getItem("done-list"));
    Data.splice(index, 1);
    localStorage.setItem("done-list", JSON.stringify(Data))
    console.log(JSON.parse(localStorage.getItem("done-list")))
}

function getDoneData(index) {
    var Data = JSON.parse(localStorage.getItem("done-list"));
    console.log(Data);
    return Data[index];
}

function getIndexOfElement(ele_name, ele_child_name, origin_this) {
    var index = -1;
    $(ele_name).find(ele_child_name).each(function (i, element) {
        if (origin_this == element) {
            index = i
        }
    })

    return index == -1 ? null : index
}

function getDoneListLength() {
    return JSON.parse(localStorage.getItem("done-list")).length;
}

function getDoingListLength() {
    return JSON.parse(localStorage.getItem("doing-list")).length;
}

function setDoingRecord(num) {
    $(".doing-section-head-record").text(num);
}

function setDoneRecord(num) {
    $(".done-section-head-record").text(num);
}


