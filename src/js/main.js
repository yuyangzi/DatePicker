/**
 * Created by wangyiming on 2017/5/31.
 */
(function () {
    let datePicker = window.dataPicker;
    let MonthDate;
    let wrap = document.createElement("div");
    wrap.className = "ui_datePicker_wrap";
    document.body.appendChild(wrap);

    /**
     * 拼接字符串以渲染数据
     * @param year 指定年份
     * @param month 指定月份
     * @returns {string} 拼接完成的HTML数据
     */
    datePicker.buildUi = function (year, month) {
        MonthDate = datePicker.getMonthDate(year, month);
        //渲染数据
        let html = `
    <div class="ui_datePicker_header">
        <a href="#" class="ui_datePicker_btn ui_datePicker_prve_btn">&lt;</a>
        <a href="#" class="ui_datePicker_btn ui_datePicker_next_btn">&gt;</a>
        <span class="ui_datePicker_current_month">${MonthDate.year}-${MonthDate.month}</span>
    </div>
    <div class="ui_datePicker_body">
        <table>
            <thead>
            <tr>
                <th>一</th>
                <th>二</th>
                <th>三</th>
                <th>四</th>
                <th>五</th>
                <th>六</th>
                <th>日</th>
            </tr>
            </thead>
            <tbody>${getDateTable()}</tbody>
        </table>
    </div>
        `;

        /**
         *  循环以创建日期表格
         * @returns {string} 日期表格的HTML代码;
         */
        function getDateTable() {
            let html = "";
            for (let i = 0; i < MonthDate.days.length; i++) {
                let _html = "";
                if (i % 7 === 0) _html += "<tr>";
                _html = "<td data-date=" + MonthDate.days[i].date + ">" + MonthDate.days[i].showDate + "</td>";
                if (i % 7 === 6) _html += "</tr>";
                html += _html;
            }
            return html;
        }

        return html;
    };

    datePicker.render = function (derection) {
        let year, month;
        if (MonthDate) {
            year = MonthDate.year;
            month = MonthDate.month;
        }

        if (derection === "prve") month--;
        if (derection === "next") month++;
        //纠正日期
        if (month === 0) {
            month = 12;
            year--;
        }


        // let html =
        wrap.innerHTML = datePicker.buildUi(year, month);
    };


    /**
     *  初始化日期表格
     * @param input
     */
    datePicker.init = function (input) {
        datePicker.render();
        input.onclick = () => {
            if (wrap.className.includes("ui_datePicker_wrap_show")) {
                wrap.classList.remove("ui_datePicker_wrap_show");
            } else {
                wrap.classList.add("ui_datePicker_wrap_show");
                let left = input.offsetLeft;
                let top = input.offsetTop;
                let height = input.offsetHeight;
                wrap.style.left = left + "px";
                wrap.style.top = top + height + 2 + "px";
            }

        };
        wrap.addEventListener("click", function (e) {
            let _target = e.target;
            if (_target.classList.contains("ui_datePicker_btn")) {
                if (_target.classList.contains("ui_datePicker_prve_btn")) {
                    datePicker.render("prve");
                }
                if (_target.classList.contains("ui_datePicker_next_btn")) {
                    datePicker.render("next");
                }
            }

            if (_target.nodeName.toLowerCase() === "td") {
                let date = new Date(MonthDate.year, MonthDate.month - 1, _target.dataset.date);
                date = form(date);

                input.value = date;
            }

        });
    };

    function form(date) {
        let year = date.getFullYear();
        let month = date.getMonth() >= 10 ? date.getMonth() + 1 : "0" + ( date.getMonth() + 1);
        let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();

        return year + "-" + month + "-" + day
    }
})();