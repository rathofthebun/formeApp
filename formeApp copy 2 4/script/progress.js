// Initialize Firebase
var config = {
	apiKey: "AIzaSyDIdaclc2AkqpFKSgt5hMIOpKSAnFAWsXs",
	authDomain: "forme-1abe6.firebaseapp.com",
	databaseURL: "https://forme-1abe6.firebaseio.com",
	projectId: "forme-1abe6",
	storageBucket: "forme-1abe6.appspot.com",
	messagingSenderId: "399636586027"
};
firebase.initializeApp(config);


var todaysDate = moment().format("YYYY-MM-DD");
var db = firebase.firestore();

//
//
// const settings = {timestampsInSnapshots: true};
// db.settings(settings);
//
//
// var docData = {
//     date: todaysDate,
//     checkIn: 8,
//     booleanExample: true,
//     journal: "I feel good!"
// };
//
// console.log(docData);
// db.collection("data").doc("today").set(docData).then(function() {
//     console.log("Document successfully written!");
// });


var uid = localStorage.getItem("uid");
var userdata = {};
var days = {};

//
///create user id & authenticate
console.log(uid);

$(function () {
	// Firestore docs https://firebase.google.com/docs/firestore/
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			if (localStorage.getItem("uid") === null) {
				localStorage.setItem("uid", user.uid);
			}
		}
	});
	if (uid !== null) {
		db.collection("forme").doc("users").collection("userdata").doc(uid).onSnapshot(function (snapshot) {
			userdata = snapshot.data();
			initUser();
		});
	}

});


function initializeData() {
	userdata[todaysDate] = {
        "checkIn": -1,
        "exercise": false,
        "journals": false
    };

	updateFirebase(true);
}

function isundefined(item) {
	return (typeof item === "undefined")
}

function initUser() {
	if (isundefined(userdata)) {
		userdata = {};

		userdata[todaysDate] = {
			"checkIn": -1,
			"exercise": false,
			"journals": false
		};
		updateFirebase();
		console.log(userdata);
		console.log("user added!");
		return;
	}


	if (isundefined(userdata[todaysDate])) {
		initializeData();
	}

	var hasNotCheckedIn = true;
	// If today exists


	// if ("undefined" === userdata["today"][todaysDate]) {
	// 	today = userdata["days"][todaysDate];
	// 	console.log(today);
	// 	$.each(today, function (index, type) {
	// 		if (type === "checkin") {
	// 			hasNotCheckedIn = false;
	// 		}
	// 		$(".daily." + type).addClass("complete");
	// 	});
	// }


	console.log(userdata);

    if(userdata[todaysDate]["checkIn"] !== -1) {
        $(".checkIn-check").addClass("complete");
        console.log("check in complete!");
    }

    if(userdata[todaysDate]["journals"] !== false) {
        $(".j-check").addClass("complete");
        console.log("check in complete!");
    }

    if(userdata[todaysDate]["exercise"] !== false) {
        $(".e-check").addClass("complete");
        console.log("check in complete!");
    }

    var daysBefore = 1;
    var days = [todayCheckin];
    var todayCheckin = {};
    todayCheckin[moment().format("YYYY-MM-DD")] = userdata[todaysDate]["checkIn"] || 0;
    var $daysProgress = $(".progressPerDay").html("");
    while (daysBefore !== 7) {
        var checkInTemp = {};
        var dateCheck = moment().subtract(daysBefore, 'days').format("YYYY-MM-DD");

        var $dayProgress = makeAppendDay(dateCheck);

        checkInTemp[dateCheck] = userdata[todaysDate]["checkIn"];
        days.push(checkInTemp);
        daysBefore++;
        $daysProgress.prepend($dayProgress);
    }


    $daysProgress.prepend(makeAppendDay(moment().format("YYYY-MM-DD")));
    initChart(days);


    // function makeAppendDay(dateCheck) {
    //     var $dayProgress = $("<li/>");
    //     var $dayItems = $("<div class='dayItems'/>").html('<h4>' + moment(dateCheck).format("ddd Do") + '</h4><div class="progressItems"></div>');
    //     $dayItems.find(".progressItems").append("<span class='checkin progress'>" + checkIcon + "</span>").append("<span class='journal progress'>" + journalIcon + "</span>").append("<span class='exercise progress'>" + exerciseIcon + "</span>");
    //     $dayProgress.append($dayItems);
    //     if (userdata[dateCheck] && userdata[dateCheck].length > 0) {
    //         userdata[dateCheck].forEach(function (dayItem) {
    //             $dayProgress.find("." + dayItem).addClass("active");
    //         });
    //     }
    //     return $dayProgress;
    // }
    //

    var checkIcon = '<svg version="1.1" viewBox="0 0 16 16" xml:space="preserve" width="16" height="16"><g class="nc-icon-wrapper" fill="#ffffff"><path fill="#ffffff" d="M16,3.6L15.2,2C8.3,4,4.8,8.4,4.8,8.4L1.6,6L0,7.6L4.8,14C8.5,7.1,16,3.6,16,3.6z"></path></g></svg>';
    var journalIcon = '<svg version="1.1" viewBox="0 0 16 16" xml:space="preserve" width="16" height="16"><g class="nc-icon-wrapper" fill="#ffffff"><rect data-color="color-2" y="14" fill="#ffffff" width="16" height="2"></rect> <path fill="#ffffff" d="M11.7,3.3c0.4-0.4,0.4-1,0-1.4l-1.6-1.6c-0.4-0.4-1-0.4-1.4,0L0,9v3h3L11.7,3.3z"></path></g></svg>';
    var exerciseIcon = '<svg version="1.1" viewBox="0 0 16 16" xml:space="preserve" width="16" height="16"><g class="nc-icon-wrapper" fill="#ffffff"><rect data-color="color-2" x="5" y="7" fill="#ffffff" width="6" height="2"></rect> <path fill="#ffffff" d="M16,7h-1V3c0-0.5522461-0.4477539-1-1-1h-1c-0.5522461,0-1,0.4477539-1,1v10c0,0.5522461,0.4477539,1,1,1h1 c0.5522461,0,1-0.4477539,1-1V9h1V7z"></path> <path fill="#ffffff" d="M3,2H2C1.4477539,2,1,2.4477539,1,3v4H0v2h1v4c0,0.5522461,0.4477539,1,1,1h1c0.5522461,0,1-0.4477539,1-1V3 C4,2.4477539,3.5522461,2,3,2z"></path></g></svg>';


    // function initChart(days) {
    //     var labels = [];
    //     var data = [];
    //     days.forEach(function (day) {
    //         // sadly only way to get name :( unless we loop
    //         var objName = Object.getOwnPropertyNames(day)[0];
    //         var dayName = moment(objName).format("ddd Do");
    //         labels.push(dayName);
    //         data.push(day[objName]);
    //     });
    //
    //     var newData = {
    //         labels: labels,
    //         datasets: [
    //             {
    //                 label: 'This week',
    //                 data: data,
    //                 backgroundColor: gradientThisWeek,
    //                 borderColor: 'transparent',
    //                 pointBackgroundColor: '#FFFFFF',
    //                 pointBorderColor: '#FFFFFF',
    //                 lineTension: 0.40,
    //             }
    //         ]
    //     };
    //     window.chart.config.data = newData;
    //     window.chart.update();
    // }

    // db.collection("data").doc("today").set(userdata).then(function () {
	// 	console.log("Document successfully written!");
	// });
}



// userdata[todaysDate]['checkIn'].push(true);

//add journal entry



$(".logOut").click(function (e) {
	e.preventDefault();
	logOut();
});

function logOut() {
	firebase.auth().signOut().then(function () {
		localStorage.removeItem("uid");
		window.location.href = "signup.html";
	}, function (error) {
		// An error happened.
	});
}

$("#sign-up").submit(function (e) {
	e.preventDefault();
	firebase.auth().createUserWithEmailAndPassword($("#signup-email").val(), $("#signup-password").val()).catch(function (error) {
		// Handle Errors here.
		console.error(error);

		let errorCode = error.code;
		let errorMessage = error.message;
		//
	});
});


function updateFirebase(reload) {
	db.collection("forme").doc("users").collection("userdata").doc(uid).set(userdata).then(function () {
		if (reload) {
			window.location.reload();
		}
	}).catch(function (er) {
		alert(er);
	});
}



