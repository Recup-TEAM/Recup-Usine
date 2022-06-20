const picker = new easepick.create({
    element: "#datepicker",
    css: [
        "https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.0/dist/index.css"
    ],
    zIndex: 10,
    lang: "fr-FR",
    format: "DD MMM YYYY",
    plugins: [
        "RangePlugin"
    ]
})

var a = picker.getStartDate();
var b = picker.getEndDate();
console.log("date star", a, "/ndate end", b);