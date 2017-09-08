//引入Gulp
let gulp = require("gulp");
//格式化js文件
let uglify = require("gulp-uglify");
//格式化CSS文件
let cleanCSS = require("gulp-clean-css");
//格式化HTML文件
let htmlmin = require("gulp-htmlmin");
//合并文件
let concat = require("gulp-concat");
//将ES6转为ES5
let babel = require("gulp-babel");
//删除文件插件
let del = require("del");

//格式化所有js文件.并将格式化的文件存放在一个临时目录
gulp.task("uglify", function () {
    return gulp.src("./src/js/*.js")
        .pipe(babel({
            presets: ["es2015"],
        }))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/_js"))
});

//将格式化的js文件合并成一个文件,并将合并的文件放入"./dist/js"下
gulp.task("concat", ["uglify"], function () {
    return gulp.src("./dist/_js/*.js")
        .pipe(concat("main.js"))
        .pipe(gulp.dest("./dist/js"))
});

//删除存放格式化js文件的临时目录
gulp.task("del", ["concat"], function () {
    return del([
        "dist/_js"
    ])
});

//格式化CSS文件
gulp.task("cleanCSS", function () {
    return gulp.src("./src/css/*.css")
        .pipe(cleanCSS())
        .pipe(gulp.dest("./dist/css"))
});

//格式化HTML文件
gulp.task("htmlmin", function () {
    let options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: false, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
    return gulp.src("./src/index.html")
        .pipe(htmlmin(options))
        .pipe(gulp.dest("./dist"))
});

//入口模块
gulp.task("default", ["del", "cleanCSS", "htmlmin"]);