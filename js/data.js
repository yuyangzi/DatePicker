(function () {
    let dataPicker = {};
    dataPicker.getMonthDate = (year, month) => {
        //获取到的日期数组
        let days = [];
        //设置形参的默认值
        if (!year || !month) {
            let currentDate = new Date();
            year = currentDate.getFullYear();
            month = currentDate.getMonth() + 1;
        }
        //获取当前月的第一天
        let fristDate = new Date(year, month - 1, 1);
        //获取当前月份的第一天是星期几,星期日的话转化为7
        let fristDateWeekDay = fristDate.getDay() ? fristDate.getDay() : 7;
        //使用Date对象的越界自动进位(退位)的特性获取到上一月的最后一天.
        let lastDayofLastMonth = new Date(year, month - 1, 0);
        //保存上一月最后一天的天数
        let lastDateOfLastMonth = lastDayofLastMonth.getDate();
        //计算当前月份的日期表中应显示多少上一月份的日期;
        let prveMonthDate = fristDateWeekDay - 1;

        //获取到当月准确的年份和月份值;
        year = fristDate.getFullYear();
        month = fristDate.getMonth() + 1;

        //获取当前月的最后一天的日期天数
        let lastDate = new Date(year, month, 0).getDate();

        //循环6周的天数.因为每个月最多只有六周
        for (let i = 0; i < 7 * 6; i++) {
            //当前月份的第一天
            let date = i + 1 - prveMonthDate;
            //应当显示的天数
            let showDate = date;
            let currentMonth = month;

            //上一月
            if (date <= 0) {
                showDate = lastDateOfLastMonth + date;
                currentMonth = month - 1;
            }
            //下一月
            if (date > lastDate) {
                showDate = date - lastDate;
                currentMonth = month + 1;
            }

            currentMonth = currentMonth === 0 ? 12 : currentMonth;
            currentMonth = currentMonth === 13 ? 1 : currentMonth;


            days.push({
                month: currentMonth,
                date: date,
                showDate: showDate,
            })
        }

        return {
            year: year,
            month: month,
            days: days,
        };
    };

    window.dataPicker = dataPicker;
})();