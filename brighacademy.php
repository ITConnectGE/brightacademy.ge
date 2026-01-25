<!DOCTYPE html>
<html data-bs-theme="light" lang="en">

<head>
  <?php include 'inc/head.php'; ?>
  <style>
.whatsapp-float {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
  text-decoration: none;
}

.whatsapp-icon {
  width: 55px;
  height: 55px;
  padding: 10px;
  border-radius: 35%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: rgb(109, 196, 110);
  transition: transform 0.3s ease;
}

.whatsapp-icon:hover {
  transform: scale(1.1);
}
</style>
</head>

<body>
  <?php include 'inc/nav.php'; ?>
  <section id="about-section" class="pb-5" style="height: 176px;">
    <!-- Start: 1 Row 2 Columns -->
    <div class="container my-3">
      <div class="row">
        <div class="col-md-12 col-xl-12 col-xxl-12 order-first order-md-first pb-3">
          <h1 style="font-weight:900; color:#161e54;">ბრაით აკადემი</h1>
          <p style="line-height:30px;">ბავშვთა განვითარების ცენტრის მიზანია, ბავშვის ჰოლისტური ხედვის დანერგვა, თერაპიების მრავლაფეროვნების მისაწვდომობის გაზრდა<br>და მშობელთა ემოციურ კეთილდღეობაზე ზრუნვა<br><br></p>
        </div>
      </div>
    </div><!-- End: 1 Row 2 Columns -->
  </section>
  <section id="video" class="CLASS1">
    <!-- Start: 1 Row 2 Columns -->
    <div class="container">
      <div class="row">
        <div class="col-md-7 col-lg-5 col-xl-5" style="margin-bottom: 28px;">
          <h1 style="font-weight: 900;color: rgba(22,30,84,0.37);text-align: left;margin-top: -29px;margin-bottom: 26px;">ჩვენი გუნდი</h1><img class="img-fluid" src="https://brightacademy.ge/assets/img/team.jpg?h=7a0e05054b4b06ccfba44112832943e3" style="border-radius:55px;">
        </div>
        <div class="col-md-12 col-lg-7 col-xl-7 align-self-center">
          <p style="line-height:30px;"><img src="https://brightacademy.ge/assets/img/logo.png?h=a40f8a2fcf69b44a76937bb5c4e923b5" width="30" height="27" style="margin-right: 12px;margin-bottom: 2px;">ჩვენ ვაერთიანებთ ბავშვის ყველა საჭიროებას და მიზანს ერთ თერაპიულ სესიაში. <br><br><img src="https://brightacademy.ge/assets/img/logo.png?h=a40f8a2fcf69b44a76937bb5c4e923b5" width="30" height="27" style="margin-right: 12px;margin-bottom: 2px;">ვიყენებთ ჰოლისტურ მიდგომას - ბავშვთან ვმუშაობთ არა რომელიმე კონკრეტულ უნარზე იზოლირებულად,&nbsp;არამედ ვუქმნით გარემოს, სადაც შეძლებს ყველა საჭირო უნარისა, თუ ცოდნის მრავალფეროვან, ბუნებრივ გარემოში ათვისებას, განმტკიცებას, გამოყენებას. <br><br><img src="https://brightacademy.ge/assets/img/logo.png?h=a40f8a2fcf69b44a76937bb5c4e923b5" width="30" height="27" style="margin-right: 12px;margin-bottom: 2px;">მთავარი ფოკუსი მიმართულია ფუნქციური უნარების განვითარებაზე<br>- ყველა ათვისებული ცოდნა უნდა ემსახურებოდეს რეალურ ცხოვრებაში დამოუკიდებლობის გაუმჯობესებას.<br><br><img src="https://brightacademy.ge/assets/img/logo.png?h=a40f8a2fcf69b44a76937bb5c4e923b5" width="30" height="27" style="margin-right: 12px;margin-bottom: 2px;">ბავშვი ერთი სესიის განმავლობაში იღებს ყველა საჭირო სპეცილისტის მიერ ერთობლივად დაგეგმილ პროგრამას. გუნდი სისტემატურად ცვლის ერთმანეთში ინფორმაციას, აფასებს სამუშაო გეგმის მიმდინარეობას, განახლების საჭიროებას და ა.შ.<br><br><br></p>
        </div>
      </div>
    </div><!-- End: 1 Row 2 Columns -->
  </section>

  <?php
  include 'inc/team.php';
  include 'inc/footer.php';
  ?>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://brightacademy.ge/assets/js/bs-init.js?h=67ee20cf4e5150919853fca3720bbf0d"></script>
  <script src="https://brightacademy.ge/assets/js/slider.js?h=75db9baacc24c65f36dd8b8e3d601eee"></script>
  
<a href="https://wa.me/+995597104028" class="whatsapp-float" target="_blank" rel="noopener noreferrer">
   <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="Chat on WhatsApp" class="whatsapp-icon">
</a>

</body>

</html>