(function() {

    class Utils {

        static showView(showEl) {
            showEl.classList.add("show");
        }

        static hideAllView(viewsEl) {
            viewsEl.forEach(element => {
                element.classList.remove("show");
            });
        }

    }

window.app = window.app || {};
window.app.Utils = Utils;

}());