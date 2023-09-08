import {apiKey_web, mesEnId, apId, measId} from "./apikey.js";
const firebaseConfig = {
  apiKey: apiKey_web,
  authDomain: "contactform-9e6c0.firebaseapp.com",
  databaseURL: "https://contactform-9e6c0-default-rtdb.firebaseio.com",
  projectId: "contactform-9e6c0",
  storageBucket: "contactform-9e6c0.appspot.com",
  messagingSenderId: mesEnId,
  appId: apId,
  measurementId: measId
};

firebase.initializeApp(firebaseConfig);

var contactFormDB = firebase.database().ref("contactForm");

document.getElementById('contactForm').addEventListener('submit', submitForm);
document.getElementById('getEmail').addEventListener('submit', getEmailSubmit);

function getEmailSubmit(e) {
    e.preventDefault();
    var nameGet = document.getElementById("nameGet").value;
    getEmailFunc(nameGet);
}

function getEmailFunc(nameGet) {
  contactFormDB.child(nameGet).once('value', (snapshot) => {
      var user = snapshot.val();
      if (user) {
          var mailGot = user.emailid;
          window.alert(`Email: ${mailGot}`);
      } else {
          window.alert("User not found!");
      }
  })
  .catch((error) => {
      console.error("Error getting email:", error);
  });
}

function submitForm(e) {
    e.preventDefault();
    var name = document.getElementById("name").value;
    var emailid = document.getElementById("emailid").value;

    saveMessages(name, emailid);

    window.alert("Details recorded");

    document.getElementById('contactForm').reset();
}

const saveMessages = (name, emailid) => {
    var newContactForm = contactFormDB.child(name);
    newContactForm.set({
        name: name,
        emailid: emailid,
    });
};
