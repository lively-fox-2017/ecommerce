var mongoose = require('mongoose');

require('../all-models').toContext(global);

Item.create([
  {
    nama_barang: "Bestway Sofa Bed 2 in 1 Double",
    harga: 200000,
    category: "kursi",
    description: "Cocok untuk kamar minimalis",
    img_url: "https://id-live-01.slatic.net/p/3/bestway-sofa-bed-2-in-1-double-sofa-multifungsi-67356-hijau-1462851772-248339-799824a4031c3fd64f879c7702bd2cae-webp-catalog_233.jpg",
  },
  {
    nama_barang: "Lemari Pakaian 5 Pintu Type 5.6",
    harga: 429999,
    category: "lemari",
    description: "Cocok ditaro dimana saja, bisa dilepas pasang",
    img_url: "https://id-live-03.slatic.net/p/3/aiueo-lemari-pakaian-5-pintu-type-56-hitam-1475229773-45332001-0c7576faa9fb20e8f8bae92131bd3264-webp-zoom.jpg",
  },
  {
    nama_barang: "Kursi Gaming Chair RGC",
    harga: 2990000,
    category: "kursi",
    description: "Kursi ergonomis untuk gamer sejati",
    img_url: "https://id-live-02.slatic.net/p/3/rexus-gaming-chair-rgc-101-1504152317-24316083-aa29eca0d17ab76342cdcdd9408cafa3-webp-zoom.jpg"
  },
  {
    nama_barang: "keset Microfiber",
    harga: 29900,
    category: "lain lain",
    description: "Keset lembut dan dapat menyerap segala jenis cairan",
    img_url: "https://id-live-01.slatic.net/p/3/paling-laku-keset-microfiber-high-quality-keset-cendol-multi-color-1490325642-34632001-595f41c6f675274a965f7eb418a0dad5-webp-zoom.jpg"
  },
  {
    nama_barang: "Shaggy Anti-skid Carpets",
    harga: 335000,
    category: "lain lain",
    description: "Karpet bermotif cerah dan cocok diatas air maupun dalam kamar",
    img_url: "https://id-live-02.slatic.net/p/3/shaggy-anti-skid-carpets-rugs-floor-matcover-80x120cm-grass-green-intl-1477500782-2546542-b0fb71ad2f8a0b4488624d99f896bb2b-webp-zoom.jpg"
  },
  {
    nama_barang: "Olive House Lemari",
    harga: 1090000,
    category: "lemari",
    description: "Lemari khusus untuk mletakan PS dan X-box anda",
    img_url: "https://id-live-03.slatic.net/p/3/the-olive-house-lemari-tv-kabinet-serbaguna-helsinki-natural-1499998501-7980185-ea14ef155068b1c97d687328cdad15ed-webp-zoom.jpg"
  },
  {
    nama_barang: "Floating Shelves",
    harga: 300000,
    category: "lemari",
    description: "Lemari terbang untuk anda yang suka hal hal mistis",
    img_url: "https://id-live-02.slatic.net/p/3/floating-shelves-uk-80x20-1496923455-83452842-d46da850cf5032df99959a572bdaefab-webp-zoom.jpg"
  },
  {
    nama_barang: "Olympic Premium Wall Unit Metropolis",
    harga: 5030400,
    category: "lemari",
    description: "Lemari tinggi untuk menyimpan barang yang tidak ingin ditemukan anak anda",
    img_url: "https://id-live-03.slatic.net/p/3/olympic-premium-wall-unit-metropolis-series-1460088450-6864917-cde7e81f9cf2e9a37585f6253fb703cf-webp-zoom.jpg"
  },
  {
    nama_barang: "Star Projector Lampu Tidur",
    harga: 140000,
    category: "lain lain",
    description: "Lampu tidur untuk pecinta astronomi",
    img_url: "https://id-live-03.slatic.net/p/3/star-projector-lampu-tidur-proyeksi-bintang-1496981678-20231942-5f0117fe9c806fa1ef38a583a7a9d578-webp-zoom.jpg"
  }

])
