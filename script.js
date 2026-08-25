/* =====================================================
   GET ELEMENTS
===================================================== */

const cursor =
    document.getElementById("customCursor");

const board =
    document.getElementById("board");

const caseFile =
    document.getElementById("caseFile");

const evidenceCards =
    document.querySelectorAll(".evidence");

const modal =
    document.getElementById("modal");

const modalTitle =
    document.getElementById("modalTitle");

const modalNumber =
    document.getElementById("modalNumber");

const closeModal =
    document.getElementById("closeModal");


/* =====================================================
   LOGIN ELEMENTS
===================================================== */

const loginButton =
    document.getElementById("loginButton");

const loginModal =
    document.getElementById("loginModal");

const loginClose =
    document.getElementById("loginClose");

const loginForm =
    document.getElementById("loginForm");

const loginStatus =
    document.getElementById("loginStatus");



/* =====================================================
   CUSTOM CURSOR
===================================================== */

let mouseX = -100;
let mouseY = -100;

let cursorX = -100;
let cursorY = -100;


document.addEventListener(
    "mousemove",
    function(event) {

        mouseX = event.clientX;
        mouseY = event.clientY;

    }
);


function moveCursor() {

    cursorX +=
        (mouseX - cursorX) * 0.18;

    cursorY +=
        (mouseY - cursorY) * 0.18;


    cursor.style.left =
        cursorX + "px";

    cursor.style.top =
        cursorY + "px";


    requestAnimationFrame(
        moveCursor
    );

}


moveCursor();



/* =====================================================
   EVIDENCE HOVER
===================================================== */

evidenceCards.forEach(
    function(card) {


        card.addEventListener(
            "mouseenter",
            function() {

                board.classList.add(
                    "has-active"
                );

                card.classList.add(
                    "active"
                );

                cursor.classList.add(
                    "cursor-evidence"
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            function() {

                board.classList.remove(
                    "has-active"
                );

                card.classList.remove(
                    "active"
                );

                cursor.classList.remove(
                    "cursor-evidence"
                );

            }
        );


        card.addEventListener(
            "click",
            function() {

                const title =
                    card.dataset.title;

                const number =
                    card.dataset.number;


                modalTitle.textContent =
                    title;

                modalNumber.textContent =
                    number;


                modal.classList.add(
                    "show"
                );

            }
        );

    }
);



/* =====================================================
   CLOSE EVIDENCE MODAL
===================================================== */

closeModal.addEventListener(
    "click",
    function() {

        modal.classList.remove(
            "show"
        );

    }
);


modal.addEventListener(
    "click",
    function(event) {

        if (event.target === modal) {

            modal.classList.remove(
                "show"
            );

        }

    }
);



/* =====================================================
   LOGIN OPEN
===================================================== */

loginButton.addEventListener(
    "click",
    function() {

        loginModal.classList.add(
            "show"
        );

        document.body.style.overflow =
            "hidden";

        cursor.classList.remove(
            "cursor-evidence"
        );

        setTimeout(
            function() {

                document
                    .getElementById("username")
                    .focus();

            },
            350
        );

    }
);



/* =====================================================
   LOGIN CLOSE
===================================================== */

function closeLogin() {

    loginModal.classList.remove(
        "show"
    );

    document.body.style.overflow =
        "hidden";

}


loginClose.addEventListener(
    "click",
    closeLogin
);


loginModal.addEventListener(
    "click",
    function(event) {

        if (
            event.target === loginModal
        ) {

            closeLogin();

        }

    }
);



/* =====================================================
   LOGIN FORM
===================================================== */

loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const username =
            document.getElementById(
                "username"
            ).value.trim();


        const password =
            document.getElementById(
                "password"
            ).value.trim();


        if (
            username === "" ||
            password === ""
        ) {

            loginStatus.textContent =
                "ACCESS DENIED — COMPLETE ALL FIELDS";

            loginStatus.classList.add(
                "error"
            );

            return;

        }


        /*
            This is currently only the UI.

            Later you can replace this section
            with your real backend authentication.
        */

        loginStatus.textContent =
            "CREDENTIALS RECEIVED — AUTHENTICATING...";

        loginStatus.classList.remove(
            "error"
        );


        setTimeout(
            function() {

                loginStatus.textContent =
                    "AUTHENTICATION READY";

            },
            1200
        );

    }
);



/* =====================================================
   BOARD PARALLAX
===================================================== */

let targetBoardX = 0;
let targetBoardY = 0;

let currentBoardX = 0;
let currentBoardY = 0;


document.addEventListener(
    "mousemove",
    function(event) {

        targetBoardX =
            (
                event.clientX /
                window.innerWidth -
                0.5
            ) * 2;


        targetBoardY =
            (
                event.clientY /
                window.innerHeight -
                0.5
            ) * 2;

    }
);



function animateBoard() {

    currentBoardX +=
        (
            targetBoardX -
            currentBoardX
        ) * 0.03;


    currentBoardY +=
        (
            targetBoardY -
            currentBoardY
        ) * 0.03;


    const strings =
        document.querySelector(
            ".strings"
        );


    strings.style.transform =
        `
        translate(
            ${currentBoardX * 4}px,
            ${currentBoardY * 4}px
        )
        `;


    caseFile.style.marginLeft =
        `${currentBoardX * 4}px`;


    caseFile.style.marginTop =
        `${currentBoardY * 4}px`;


    requestAnimationFrame(
        animateBoard
    );

}


animateBoard();



/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            modal.classList.remove(
                "show"
            );

            loginModal.classList.remove(
                "show"
            );

        }

    }
);



/* =====================================================
   MENU BUTTON
===================================================== */

const menuBtn =
    document.getElementById(
        "menuBtn"
    );


menuBtn.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "menu-open"
        );

    }
);