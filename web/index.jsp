<%--
  Created by IntelliJ IDEA.
  User: zhichengqian
  Date: 4/2/20
  Time: 3:47 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>o(*≧▽≦)ツ @EventBox </title>
    <meta charset="UTF-8">
    <meta name="description" content="Item Recommendation">
    <meta name="author" content="Zhicheng Qian">

    <title>Item Recommendation Final</title>
<%--    <link href="https://fonts.googleapis.com/css?family=Roboto|Sen&display=swap" rel="stylesheet">--%>
    <link rel="icon" type="image/ico" href="icon/ticket.svg">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="./styles/main.css">
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
  </head>
  <body>
  <header class="top-header">
    <nav class="navbar navbar-expand-md" style="width: 100%">
      <div class = "container-fluid">

        <div class = "navbar-header">
            <a class = "navbar-brand the-icon" href="/search" style="color: cornflowerblue">
              <img class="d-inline-block align-top" src="icon/ticket.svg" width="30" height="30">
              HeyEvent
            </a>
            <a href="#" style="color: #CE96FB; margin-left: 15px;">Home</a>
            <a href="#" style="color: #CE96FB; margin-left: 10px">Contact</a>
            <a href="#" style="color: #CE96FB; margin-left: 10px">About</a>
        </div>
        <button class="navbar-toggler"  type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon" ></span>
        </button>

        <div id="navbarCollapse" class="collapse navbar-collapse" >
          <ul id= "the-log" style="display: flex" class="nav navbar-nav navbar-right ml-auto">
            <li id="welcome-msg" class = "mr-2" style="margin: auto">w</li>
            <li><i id="avatar" style="margin: auto" class="avatar fa fa-user fa-2x"></i></li>
          </ul>

<%--          id="welcome-msg"--%>

        </div>

      </div>
    </nav>

  </header>

<%--  style="height: 350px; background-image: url('https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3a413a0b054159dd7840130c25e6dbdf&auto=format&fit=crop&w=1050&q=80');"--%>
<%--  <div   class="container" style="height: 350px;align-items: center;background-size: 100%;display: flex;--%>
<%--background-image: url('https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3a413a0b054159dd7840130c25e6dbdf&auto=format&fit=crop&w=1050&q=80'); ">--%>
  <div style="height: 500px; width: 100%" >
<%--        <img height="500px" style="object-fit: cover;vertical-align: middle;opacity: 80%;" class="d-block w-100 index-img" src="https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3a413a0b054159dd7840130c25e6dbdf&auto=format&fit=crop&w=1050&q=80" alt="Search Engine Second Slide">--%>
<%--      <div class="container">--%>
        <video width="100%" height="500px" autoplay muted loop controls style="object-fit: cover;opacity: 80%;vertical-align: middle">
          <source src="icon/testVideo.mp4" type="video/mp4">

        </video>
        <div class= text-left" style="left: 20%; top: 160px; position: absolute">

          <h1 class="textShadow" style="font-size: 60px; font-family: 'Sen', sans-serif">EventBox</h1>
          <h3 class="textShadow" style="font-family: 'Sen', sans-serif">Get the ticket, Enjoy the show</h3>
<%--          <div style="margin: 20px auto;" >--%>
<%--            <form class=" s-search real-search" action="/photoboards" method="GET" >--%>
<%--              <button  class="btn btn-link btn-sm border-0 s-search-button" type="submit"><img src="icon/search.svg" height="16" width="16" class="s-search-icon" ></button>--%>
<%--              <div class="s-search-in" role="combobox">--%>
<%--                <input required name="search" class="s-search-input" type="search" placeholder="Start exploring... " aria-label="Search" value autocomplete="off" spellcheck="true">--%>
<%--              </div>--%>
<%--            </form>--%>
<%--          </div>--%>
          <form class="input-group mb-3 mt-5" style="width: 370px" id="location-form">
            <input required id="location-input" type="text" class="form-control" placeholder="Search Location..." aria-label="Recipient's username" aria-describedby="button-addon2">
            <div class="input-group-append">
              <button class="btn btn-info" type="submit" id="button-addon2">Search</button>
            </div>
          </form>
        </div>
<%--      </div>--%>

  </div>

  <div>
  <section class="main-section">

    <aside id="item-nav" style="width: 30%">
      <div class="nav-icon">
        <i class="fa fa-sitemap fa-2x"></i>
      </div>
      <nav class="main-nav" >
        <a href="#" id="nearby-btn" class="main-nav-btn active" style="text-align: center">
          <i class="fa fa-map-marker"></i> Nearby
        </a>
        <a href="#" id="fav-btn" class="main-nav-btn" style="text-align: center">
          <i class="fa fa-heart"></i> My Favorites
        </a>
        <a href="#" id="recommend-btn" class="main-nav-btn" style="text-align: center">
          <i class="fa fa-thumbs-up"></i> Recommendation
        </a>
      </nav>
    </aside>

    <h4 style="
    padding: 20px; height: 68px;margin-left: 30%; margin-bottom: 0; font-family: 'Sen', sans-serif" id = "cur-loc"></h4>
    <ul id="item-list" style="margin-left: 30%">
      <li class="item">
        <img alt="item image" src="https://s3-media3.fl.yelpcdn.com/bphoto/EmBj4qlyQaGd9Q4oXEhEeQ/ms.jpg"/>
        <div>
          <a class="item-name" href="#">Item</a>
          <p class="item-category">Vegetarian</p>

          <div class="stars">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
          </div>

        </div>
        <p class="item-address">699 Calderon Ave<br/>Mountain View<br/> CA</p>
        <div class="fav-link">
          <i class="fa fa-heart"></i>
        </div>
        <a class="item-link btn btn-sm btn-outline-light" href="#">Get Ticket !</a>
      </li>
    </ul>
  </section>

  </div>


  <footer>
    <p class="title">What We Do</p>
    <p>"Help you find the best place around."</p>
    <ul>
      <li>
        <p><i class="fa fa-map-o fa-2x"></i></p>
        <p>Los Angeles, CA</p>
      </li>
      <li>
        <p><i class="fa fa-envelope-o fa-2x"></i></p>
        <p>info@zqian@eventbox.com</p>
      </li>
      <li>
        <p><i class="fa fa-phone fa-2x"></i></p>
        <p>+1 321 000 0000</p>
      </li>
    </ul>
  </footer>


  <script src="https://rawgit.com/emn178/js-md5/master/build/md5.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
  <script src="./scripts/main.js"></script>
<%--  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDlZrwMtL8IFWtBS2bi5hNXaqErzb0Qaw8&callback=initMap"--%>
<%--          async defer></script>--%>

  </body>
</html>
