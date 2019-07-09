const goToSection = (section, event) => {
  event.preventDefault();
  // const element = document.getElementById(section);
  const element = $(`#${section}`);
  if (element[0]) {
    $("html, body").animate(
      {
        scrollTop: element.eq(0).offset().top
      },
      300
    );
  }
  // if (element) {
  //   window.scrollTo({
  //     behavior: "smooth",
  //     left: 0,
  //     top: element.offsetTop
  //   });
  // }
};
