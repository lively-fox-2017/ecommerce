<template>
  <div class="Slide">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12">
          <div id="carousel-custom" class="carousel slide" data-ride="carousel">

            <!-- Wrapper for slides -->
            <div class="carousel-inner" role="listbox">
              <div class="item active">
                <img src="https://res.cloudinary.com/simpleview/image/upload/c_fill,f_auto,h_600,q_65,w_1400/v1/clients/neworleans/NOTMC_30940_28f4b064-485a-4529-9ff6-76b26ecb7daa.jpg" alt="..." class="img-responsive">
              </div>
              <div class="item">
                <img src="http://www.tiquethestore.com/wp-content/uploads/2016/05/IMG_8589-1400x600.jpg" alt="..." class="img-responsive">
              </div>
            </div>

            <!-- Controls -->
            <a class="left carousel-control" href="#carousel-custom" role="button" data-slide="prev">
              <i class="fa fa-chevron-left"></i>
              <span class="sr-only">Previous</span>
            </a>

            <a class="right carousel-control" href="#carousel-custom" role="button" data-slide="next">
              <i class="fa fa-chevron-right"></i>
              <span class="sr-only">Next</span>
            </a>

            <!-- Indicators -->
            <ol class="carousel-indicators visible-sm-block hidden-xs-block visible-md-block visible-lg-block">
              <li data-target="#carousel-custom" data-slide-to="0" class="active">
                <img src="https://res.cloudinary.com/simpleview/image/upload/c_fill,f_auto,h_600,q_65,w_1400/v1/clients/neworleans/NOTMC_30940_28f4b064-485a-4529-9ff6-76b26ecb7daa.jpg" alt="..." class="tambnail img-responsive">
              </li>
              <li data-target="#carousel-custom" data-slide-to="1">
                <img src="http://www.tiquethestore.com/wp-content/uploads/2016/05/IMG_8589-1400x600.jpg" alt="..." class="tambnail img-responsive">
              </li>
            </ol>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slide',
  data () {
    return {
    }
  },
  created () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Slide {
  /*padding-top: auto;*/
}
#carousel-custom {
    /*margin-top:  10px;*/
    width: 100%;
}
#carousel-custom .carousel-indicators {
    margin: 10px 0 0;
    overflow: auto;
    position: static;
    text-align: left;
    white-space: nowrap;
    width: 100%;
}
#carousel-custom .carousel-indicators li {
    background-color: transparent;
    -webkit-border-radius: 0;
    border-radius: 0;
    display: inline-block;
    height: auto;
    margin: 0 !important;
    width: auto;
}
#carousel-custom .carousel-indicators li img {
    display: block;
    opacity: 0.5;
}
#carousel-custom .carousel-indicators li.active img {
    opacity: 1;
}
#carousel-custom .carousel-indicators li:hover img {
    opacity: 0.75;
}
#carousel-custom .carousel-outer {
    position: relative;
}
.carousel-control.left {
    background-image: none;
    width: 54px;
    height: 54px;
    top: 50%;
    left: 20px;
    margin-top: -27px;
    line-height: 54px;
    border: 2px solid #fff;
    opacity: 1;
    text-shadow: none;
    -webkit-transition: all 0.2s ease-in-out 0s;
    -o-transition: all 0.2s ease-in-out 0s;
    transition: all 0.2s ease-in-out 0s;
}
.carousel-control.right {
    background-image: none;
    width: 54px;
    height: 54px;
    top: 50%;
    right: 20px;
    margin-top: -27px;
    line-height: 54px;
    border: 2px solid #fff;
    opacity: 1;
    text-shadow: none;
    -webkit-transition: all 0.2s ease-in-out 0s;
    -o-transition: all 0.2s ease-in-out 0s;
    transition: all 0.2s ease-in-out 0s;
}
.tambnail {
  width: 100px;
  height: 50px;
}
</style>
