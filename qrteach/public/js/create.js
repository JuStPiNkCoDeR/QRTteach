jQuery(document).ready(function () {
    let testData = [null, null, null, null, null];
    let prevIndex = null;
    $('table tbody tr').click(function () {
        if (prevIndex !== null) $('table tbody tr').eq(prevIndex).removeClass('chosen');
        prevIndex = $(this).index();
        $(this).addClass('chosen');

        if (testData[prevIndex] === null) {
            testData[prevIndex] = {
                question: null,
                maxMark: null,
                time: null,
                isOver: false
            };
        }

        $('form').fadeIn(300).delay(310).removeClass('not-chosen');

        let questTD = $('tbody tr').eq(prevIndex).find('td:nth-child(2) .question-container');
        let tdWidth = $('tbody tr').eq(prevIndex).find('td:nth-child(2)').width();
        $('#question').keyup(function () {
            let txt;
            console.log('text => ' + questTD.width() + ', block => ' + tdWidth);
            if (questTD.width() + 40 >= tdWidth && !testData[prevIndex].isOver) {
                txt = questTD.text();
                txt += "...";
                testData[prevIndex].isOver = true;
            } else if (questTD.width() + 40 < tdWidth) txt = $(this).val();
            questTD.text(txt);
        })
    })
});