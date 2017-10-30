<template lang="html">
  <div class="col-sm-6 col-md-3">
    <div class="thumbnail">
      <img v-bind:src="maknanProduct.gambar" alt="...">
      <div class="caption">
        <h3>{{ maknanProduct.namaProduct }}</h3>
        <p>Rp. {{ maknanProduct.harga }}</p>
        <p><a href="#" class="btn btn-danger glyphicon glyphicon-trash" role="button" @click="deleteProduct(maknanProduct._id)"> Hapus</a> <a href="#" class="btn btn-primary glyphicon glyphicon-resize-full btn-md glyphicon glyphicon-pencil" role="button" data-toggle="modal" :data-target="'#myModal' + maknanProduct._id" @click="tampilEdit(maknanProduct)"> Edit</a></p>

        <!-- Modal -->
        <div :id="'myModal' +  maknanProduct._id" class="modal fade" role="dialog">
          <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Silahkan masukan yang ingin anda rubah</h4>
              </div>
              <div class="modal-body">
                <form @submit.prevent="editProduct(MakananEdit)">
                  <div class="form-group">
                    <label class="control-label" for="focusedInput"> Image URL</label>
                    <input class="form-control" type="text" placeholder="image url..." v-model="MakananEdit.gambar">
                  </div>
                  <div class="form-group">
                    <label class="control-label" for="focusedInput"> Nama menu Makanan</label>
                    <input class="form-control" type="text" placeholder="namaProduct" v-model="MakananEdit.namaProduct">
                  </div>
                  <div class="form-group">
                    <label class="control-label" for="focusedInput"> Harga</label>
                    <input class="form-control" placeholder=" Harga..."v-model="MakananEdit.harga">
                  </div>
                  <div class="form-group">
                    <button type="submit" class="btn btn-primary glyphicon glyphicon-plus"  data-dismiss="modal"> Update</button>
                  </div>
                </form>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal" @click="hapusProp">Close</button>
              </div>
            </div>

          </div>
        </div>
        <!-- / modal -->

      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['maknanProduct'],
  data () {
    return {
      MakananEdit: {}
    }
  },
  methods: {
    ...mapActions([
      'deleteProduct',
      'editProduct'
    ]),
    tampilEdit (dataProduct) {
      console.log(dataProduct, '<------ ini id yang di pilih')
      this.MakananEdit = dataProduct
      console.log(this.MakananEdit, 'tampi niih kjkjkj')
    },
    hapusProp () {
      this.MakananEdit = {}
    }
  }
}
</script>

<style lang="css">
.thumbnail {
    width: 243px;
    height: 337px;
}
</style>
