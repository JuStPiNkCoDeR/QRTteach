let animTime = 200;
let delay = animTime + 50;

class Interval {
    constructor(elements, taskIndex, taskTime) {
        this.el = elements;
        this.index = taskIndex;
        this.time = {};
        this.interval = null;
        this.isFinished = false;
        this.time.minutes = Number(taskTime.minutes);
        this.time.seconds = Number(taskTime.seconds);
    }
    stop() {
        let cl = this;
        clearInterval(cl.interval);
    }
    get finish_status() {
        return this.isFinished;
    }
    start() {
        let cl = this;
        $(cl.el.timer).text(cl.time.minutes + ":" + cl.time.seconds);
        this.interval = setInterval(function () {
            if (cl.time.seconds === 0) {
                if (cl.time.minutes === 0) {
                    cl.isFinished = true;
                    $(cl.el.ans).attr('disabled', '');
                    $(cl.el.timer).fadeOut(animTime);
                    setTimeout(function () {
                        $(cl.el.overT).fadeIn(animTime);
                    }, delay);
                    return;
                } else {
                    cl.time.minutes--;
                    cl.time.seconds = 60;
                }
            }
            $(cl.el.timer).text(cl.time.minutes + ":" + cl.time.seconds);
            cl.time.seconds--;
        }, 1000);
    }
}

jQuery(document).ready(function () {
    let taskIndex = null;
    let result = [];
    let taskTimers = [];
    for (let k = 0; k < test.test.length; k++) {
        taskTimers.push(null);
        result.push(null);
    }
    let testTimer = "";
    let testTime = test.testOptions.timeTest;
    if (testTime.minutes !== null || testTime.seconds !== null) {
        if (testTime.minutes === null) testTime.minutes = 0;
        testTimer = setInterval(function () {
            if (testTime.seconds === 0) {
                if (testTime.minutes === 0) {
                    clearInterval(testTimer);
                    $('.task').fadeOut(animTime);
                    $('button').click();
                } else {
                    testTime.minutes--;
                    testTime.seconds = 60;
                }
            }
            $('#timeTest').text(testTime.minutes + ":" + testTime.seconds);
            testTime.seconds--;
        }, 1000);
    }
    else {
        let countingSeconds = 0;
        let countingMin = 0;
        for (let i = 0; i < test.test.length; i++) {
            let taskTime = test.test[i].timeTask;
            if (taskTime.seconds !== null && taskTime.minutes === null) countingSeconds+=Number(taskTime.seconds);
            else if (taskTime.minutes !== null) {
                countingMin += Number(taskTime.minutes);
                if (taskTime.seconds !== null) countingSeconds+=Number(taskTime.seconds);
            } else countingSeconds+=20;
            if (countingSeconds === 60) {
                countingMin++;
                countingSeconds = 0;
            }
        }
        testTimer = setInterval(function () {
            if (countingSeconds === 0) {
                if (countingMin === 0) {
                    clearInterval(testTimer);
                    $('.task').fadeOut(animTime);
                    $('button').click();
                } else {
                    countingMin--;
                    countingSeconds = 60;
                }
            }
            $('#timeTest').text(countingMin + ':' + countingSeconds);
            countingSeconds--;
        }, 1000);
    }
    $('.test-block .short-test-desk table tbody tr').click(function () {
        $('.task .ans-block').html("");
        if (taskIndex !== null) {
            taskTimers[taskIndex].stop();
            $('table tbody tr').eq(taskIndex).removeClass('chosen');
        }
        taskIndex = $(this).index();
        $(this).addClass('chosen');
        if (taskIndex + 1 <= $('table tbody tr:last-child').index()) {
            $('#complete').fadeOut(animTime - 100);
            $('.next-task').fadeIn(animTime);
        }
        else {
            $('.next-task').fadeOut(animTime - 100);
            $('#complete').fadeIn(animTime);
        }

        $('.task #taskQuestion').text(test.test[taskIndex].question);
        let answerRight = test.test[taskIndex].answers.right;
        let answerWrong = test.test[taskIndex].answers.wrongs;
        let ansLength = answerWrong.length + 1;
        let rightIndex = Math.floor(Math.random() * ansLength);
        let wrongCount = 0;
        for (let i = 0; i < ansLength; i++) {
            if (i === rightIndex) $('.task .ans-block').append('<label for="'+ answerRight +'"><input id="' + answerRight + '" type="radio" name="answer" value="'+ answerRight +'">'+ answerRight +'</label>');
            else {
                $('.task .ans-block').append('<label for="'+ answerWrong[wrongCount] +'"><input id="' + answerWrong[wrongCount] + '" type="radio" name="answer" value="'+ answerWrong[wrongCount] +'">'+ answerWrong[wrongCount] +'</label>');
                wrongCount++;
            }
        }
        if (taskTimers[taskIndex] !== null) console.log(taskTimers[taskIndex].finish_status);
        if (taskTimers[taskIndex] !== null && taskTimers[taskIndex].finish_status) $('.task input[type="radio"]').attr('disabled', '');
        let time = test.test[taskIndex].timeTask;
        if (taskTimers[taskIndex] !== null && taskTimers[taskIndex].finish_status) {
            $('.task #taskTime').fadeOut(animTime);
            setTimeout(function () {
                $('.task #overTime').fadeIn(animTime);
            }, delay);
        } else {
            if (time.minutes !== null || time.seconds !== null) {
                if (time.minutes === null) time.minutes = 0;
                if (taskTimers[taskIndex] === null) taskTimers[taskIndex] = new Interval({timer:$('.task #taskTime'), ans:$('.ans-block input[type="radio"]'), overT: $('.task #overTime')}, taskIndex, time);
                $('.task #overTime').fadeOut(animTime);
                setTimeout(function () {
                    $('.task #taskTime').fadeIn(animTime);
                }, delay);
                taskTimers[taskIndex].start();
            }
            else {
                $('.task #taskTime').text('-.-.-');
            }
        }
        $('.task input[type="radio"]').change(function () {
            if (!taskTimers[taskIndex].finish_status) result[taskIndex] = $(this).val();
            console.log(result);
        });
    });
    $('.test-block .short-test-desk table tbody tr').eq(0).click();
    $('button').click(function (e) {
        e.preventDefault();
        let rightRes = [];
        let rightCount = 0;
        for (let i = 0; i < test.test.length; i++) rightRes.push(test.test[i].answers.right);
        for (let j = 0; j < result.length; j++) if (result[j] === rightRes[j]) rightCount++;
        let mark = (rightCount / result.length) * 100;
        $('#percentage').text(mark + "%");
    })
});