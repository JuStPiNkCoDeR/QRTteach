jQuery(document).ready(function () {
    let animTime = 200;
    let delay = animTime + 50;
    let testData = {
        testOptions: {
            type: "simpleTest",
            isTemp: true,
            timeTest: {
                minutes: null,
                seconds: null
            }
        },
        test: [null, null, null, null, null]
    };
    let index = null;
    let tabIndex = null;

    function upTaskInfo(index) {
        $('#question').val(testData.test[index].question);
        $('#answer').val(testData.test[index].answers.right);
        $('#wrong1').val(testData.test[index].answers.wrongs[0]);
        $('#wrong2').val(testData.test[index].answers.wrongs[1]);
        $('#wrong3').val(testData.test[index].answers.wrongs[2]);
        $('#req-min').val(testData.test[index].timeTask.minutes);
        $('#req-sec').val(testData.test[index].timeTask.seconds);
    }
    function clearFields() {
        $('#question').val('');
        $('#answer').val('');
        $('#wrong1').val('');
        $('#wrong2').val('');
        $('#wrong3').val('');
        $('#req-min').val('');
        $('#req-sec').val('');
    }
    $('.tab').click(function () {
        let thisID = $(this).attr('id');
        if (tabIndex !== null) $(tabIndex).removeClass('chosen');
        if (tabIndex === null) {
            if (thisID === "taskTab") {
                if (index === null) index = 0;
                if (testData.test[index] !== null) upTaskInfo(index);
                $('table tbody tr').eq(index).addClass('chosen');
                if (testData.test[index] === null) {
                    testData.test[index] = {
                        question: null,
                        answers: {
                            right: null,
                            wrongs: [null, null, null]
                        },
                        maxMark: null,
                        timeTask: {
                            minutes: null,
                            seconds: null
                        },
                        isOver: false
                    };
                }
                $('#task').fadeIn(animTime).delay(310).removeClass('not-chosen');
            } else if (thisID === 'testTab') $('#test').fadeIn(animTime).delay(310).removeClass('not-chosen');
            else if (thisID === 'errTab') $('#errors').fadeIn(animTime).delay(310).removeClass('not-chosen');
        } else {
            if (thisID === "taskTab") {
                if (index === null) index = 0;
                if (testData.test[index] !== null) upTaskInfo(index);
                if (testData.test[index] === null) {
                    testData.test[index] = {
                        question: null,
                        answers: {
                            right: null,
                            wrongs: [null, null, null]
                        },
                        maxMark: null,
                        timeTask: {
                            minutes: null,
                            seconds: null
                        },
                        isOver: false
                    };
                }
                $('table tbody tr').eq(index).addClass('chosen');
                if (tabIndex === '#testTab') $('#test').fadeOut(animTime);
                else $('#errors').fadeOut(animTime);
                setTimeout(function () {
                    $('#task').fadeIn(animTime).delay(310).removeClass('not-chosen');
                }, delay);
            } else {
                if (index !== null) {
                    $('table tbody tr').eq(index).removeClass('chosen');
                    //upTaskInfo(index);
                }
                if (tabIndex === '#taskTab') $('#task').fadeOut(animTime);
                else if (tabIndex === '#testTab') $('#test').fadeOut(animTime);
                else if (tabIndex === '#errTab') $('#errors').fadeOut(animTime);
                setTimeout(function () {
                    if (thisID === 'testTab') {
                        $('#test').fadeIn(animTime).delay(310).removeClass('not-chosen');
                    }
                    else if (thisID === 'errTab') $('#errors').fadeIn(animTime).delay(310).removeClass('not-chosen');
                }, delay);
            }
        }
        tabIndex = '#' + thisID;
        $(this).addClass('chosen');
    });
    $('table tbody tr').click(function () {
        if (index !== null) $('table tbody tr').eq(index).removeClass('chosen');
        index = $(this).index();
        $(this).addClass('chosen');
        if (index + 1 <= $('table tbody tr:last-child').index()) $('.next-task').fadeIn(animTime);
        else $('.next-task').fadeOut(animTime - 100);

        if (testData.test[index] === null) {
            testData.test[index] = {
                question: null,
                answers: {
                    right: null,
                    wrongs: [null, null, null]
                },
                maxMark: null,
                timeTask: {
                    minutes: null,
                    seconds: null
                },
                isOver: false
            };
            clearFields();
        } else upTaskInfo(index);
        $('#taskTab').addClass('chosen');
        if (tabIndex === null) $('#task').fadeIn(animTime).delay(310).removeClass('not-chosen');
        else {
            $(tabIndex).removeClass('chosen');
            if (tabIndex === '#testTab') $('#test').fadeOut(animTime);
            else if (tabIndex === '#errTab') $('#errors').fadeOut(animTime);
            setTimeout(function () {
                $('#task').fadeIn(animTime);
            }, delay);
        }
        tabIndex = "#taskTab";
    });

    $('#question').keyup(function () {
        let txt;
        let tdWidth = $('tbody tr').eq(index).find('td:nth-child(2)').width();
        if ($('tbody tr').eq(index).find('td:nth-child(2) .question-container').width() + 40 >= tdWidth && !testData.test[index].isOver) {
            txt = $('tbody tr').eq(index).find('td:nth-child(2) .question-container').text();
            txt += "...";
            testData.test[index].isOver = true;
        } else if ($('tbody tr').eq(index).find('td:nth-child(2) .question-container').width() + 40 < tdWidth) txt = $(this).val();
        $('tbody tr').eq(index).find('td:nth-child(2) .question-container').text(txt);

        testData.test[index].question = $(this).val();
    });
    $('#answer').change(function () {
        testData.test[index].answers.right = $(this).val();
    });
    $('#wrong1').change(function () {
        testData.test[index].answers.wrongs[0] = $(this).val();
    });
    $('#wrong2').change(function () {
        testData.test[index].answers.wrongs[1] = $(this).val();
    });
    $('#wrong3').change(function () {
        testData.test[index].answers.wrongs[2] = $(this).val();
    });
    $('#max-mark').keyup(function () {
        testData.test[index].maxMark = $(this).val();
    });
    $('#req-min').change(function () {
        testData.test[index].timeTask.minutes = $(this).val();
    });
    $('#req-sec').change(function () {
        testData.test[index].timeTask.seconds = $(this).val();
    });
    $('#req-test-min').change(function () {
        testData.testOptions.timeTest.minutes = $(this).val();
        $('#time-test #test-min').text($(this).val() + ' минут(-а)');
    });
    $('#req-test-sec').change(function () {
        testData.testOptions.timeTest.seconds = $(this).val();
        $('#time-test #test-sec').text($(this).val() + ' секунд(-а)');
    });
    $('.next-task').click(function () {
        $('table tbody tr').eq(index).removeClass('chosen');
        index++;
        $('table tbody tr').eq(index).addClass('chosen');
        if (index === $('table tbody tr:last-child').index()) $(this).fadeOut(200);
        if (testData.test[index] === null) {
            testData.test[index] = {
                question: null,
                answers: {
                    right: null,
                    wrongs: [null, null, null]
                },
                maxMark: null,
                timeTask: {
                    minutes: null,
                    seconds: null
                },
                isOver: false
            };
            clearFields();
        } else upTaskInfo(index);
    });
    $('button').click(function (e) {
        e.preventDefault();
        let copyTest = testData;
        let parseResult = [];
        for (let i = 0; i < copyTest.test.length; i++) {
            let realNumQuestion = i + 1;
            let numQuestion = 'Для вопроса (' + realNumQuestion + ') ';
            if (copyTest.test[i] === null) {
                copyTest.test.splice(i,1);
                i--;
            } else {
                if (copyTest.test[i].question === null || "") parseResult.push(numQuestion + ' не указан вопрос');
                if (copyTest.test[i].answers.right === null || "") parseResult.push(numQuestion + 'не указан правильный ответ');
                for (let j = 0; j < copyTest.test[i].answers.wrongs.length; j++) {
                    if (copyTest.test[i].answers.wrongs[j] === null || "") {
                        copyTest.test[i].answers.wrongs.splice(j,1);
                        j--;
                    }
                }
                if (copyTest.test[i].answers.wrongs.length === 0) parseResult.push(numQuestion + ' не указаны ошибочные ответы');
                if (copyTest.test[i].maxMark === null || "") parseResult.push(numQuestion + ' не указан получаемый балл');
            }
        }
        if (parseResult.length !== 0) {
            let errHTML = "";
            for (let k = 0; k < parseResult.length; k++) errHTML+='<li>' + parseResult[k] + '</li>';
            $('#errors').html(errHTML);
            $('#errTab').click();
        } else {
            console.log(copyTest);
            let ajax = new XMLHttpRequest();
            ajax.open('POST', '/create/QR', true);
            ajax.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            ajax.setRequestHeader("Content-type", "application/*+json");
            ajax.onreadystatechange = function () {
                if (this.readyState !== 4) return;
                console.log(this.responseText);
                let ans = JSON.parse(this.responseText);
                console.log(ans);
                $('body').append(ans.QR);
            };
            ajax.send(JSON.stringify(copyTest));
        }
    })
});