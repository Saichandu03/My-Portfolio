$(document).ready(function() {

  //sticky header
    $(window).scroll(function() {
      if ($(this).scrollTop() > 1) {
        $(".header-area").addClass("sticky");
      } else {
        $(".header-area").removeClass("sticky");
      }
  
      // Update the active section in the header
      updateActiveSection();
    });
  
    $(".header ul li a").click(function(e) {
      e.preventDefault(); 
  
      var target = $(this).attr("href");
  
      if ($(target).hasClass("active-section")) {
        return; 
      }
  
      if (target === "#home") {
        $("html, body").animate(
          {
            scrollTop: 0 
          },
          500
        );
      } else {
        var offset = $(target).offset().top - 40; 
  
        $("html, body").animate(
          {
            scrollTop: offset
          },
          500
        );
      }
  
      $(".header ul li a").removeClass("active");
      $(this).addClass("active");
    });
  

    //Initial content revealing js
    ScrollReveal({
      distance: "100px",
      duration: 2000,
      delay: 200
    });
  
    ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
      origin: "left"
    });
    ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
      origin: "right"
    });
    ScrollReveal().reveal(".project-title, .contact-title", {
      origin: "top"
    });
    ScrollReveal().reveal(".projects, .contact", {
      origin: "bottom"
    });

  //contact form to excel sheet
  // const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
  // const form = document.forms['submitToGoogleSheet']
  // const msg = document.getElementById("msg")

  // form.addEventListener('submit', e => {
  //     e.preventDefault()
  //     fetch(scriptURL, { method: 'POST', body: new FormData(form) })
  //         .then(response => {
  //             msg.innerHTML = "Message sent successfully"
  //             setTimeout(function () {
  //                 msg.innerHTML = ""
  //             }, 5000)
  //             form.reset()
  //         })
  //         .catch(error => console.error('Error!', error.message))
  // })
    
  });
  
  function updateActiveSection() {
    var scrollPosition = $(window).scrollTop();
  
    // Checking if scroll position is at the top of the page
    if (scrollPosition === 0) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#home']").addClass("active");
      return;
    }
  
    // Iterate through each section and update the active class in the header
    $("section").each(function() {
      var target = $(this).attr("id");
      var offset = $(this).offset().top;
      var height = $(this).outerHeight();
  
      if (
        scrollPosition >= offset - 40 &&
        scrollPosition < offset + height - 40
      ) {
        $(".header ul li a").removeClass("active");
        $(".header ul li a[href='#" + target + "']").addClass("active");
      }
    });
  }



emailjs.init("ZLaxZZCxAPhJXlu2-");

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const form = event.target;

  // Collect form data
  const templateParams = {
      from_name: form.NAME.value,
      from_email: form.EMAIL.value,
      subject: form.SUBJECT.value || "No Subject",
      message: form.MESSAGE.value
  };

  // Send Email to Admin
  emailjs.send("service_g1cx9to", "template_ikmochs", templateParams)
  .then(function(response) {
      console.log('Admin Email Sent:', response);

      // Send Auto-Reply to User
      return emailjs.send("service_g1cx9to", "template_g97luco", templateParams);
  })
  .then(function(response) {
      // Show success toast
      Toastify({
          text: "Mail sent successfully! Check your confirmation mail.",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "green",
      }).showToast();

      form.reset();
  })
  .catch(function(error) {
      console.log('Error:', error);
      
      // Show error toast
      Toastify({
          text: "Failed to send message. Please try again.",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "red",
      }).showToast();
  });
});

 
