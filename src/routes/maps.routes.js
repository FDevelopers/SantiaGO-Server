const express = require("express");
const router = express.Router();

router.get("/rutas", (req, res) => {
  res.json([
    {
      name: "Ruta A",
      colorRutas: "#0FC72E",
      colorParadas:"#DD3A05",
      coordinates: [
        { latitude: 19.441261067653702, longitude: -70.68447494396473 },
        { latitude: 19.441110617673907, longitude: -70.68421994802462 },
        { latitude: 19.440722873714073, longitude: -70.6840119113434 },
        { latitude: 19.439999867367206, longitude: -70.68379446524877 },
        { latitude: 19.43982667087049, longitude: -70.68366396107572 },
        { latitude: 19.439642152041742, longitude: -70.68340774142224 },
        { latitude: 19.439550643294996, longitude: -70.68301725420548 },
        { latitude: 19.43958724772565, longitude: -70.68264972870513 },
        { latitude: 19.439706330101025, longitude: -70.68244005570648 },
        { latitude: 19.43997965663435, longitude: -70.68220636466968 },
        { latitude: 19.440231231788708, longitude: -70.68210382411527 },
        { latitude: 19.440843476984565, longitude: -70.68192436334499 },
        { latitude: 19.4413073291145, longitude: -70.68180230305876 },
        { latitude: 19.44187927059239, longitude: -70.68153771641768 },
        { latitude: 19.442407980775524, longitude: -70.68116959888073 },
        { latitude: 19.442741299902487, longitude: -70.68104240619671 },
        { latitude: 19.443422816845363, longitude: -70.68101355526439 },
        { latitude: 19.444157964535382, longitude: -70.68105631999981 },
        { latitude: 19.444380774750798, longitude: -70.6810221994903 },
        { latitude: 19.444515461789354, longitude: -70.68104882420553 },
        { latitude: 19.444690912620135, longitude: -70.68141883911352 },
        { latitude: 19.444912550009015, longitude: -70.6816931928994 },
        { latitude: 19.445171532316817, longitude: -70.68188697196291 },
        { latitude: 19.44609036498044, longitude: -70.68229893361183 },
        { latitude: 19.447321224862648, longitude: -70.68278561561267 },
        { latitude: 19.447947857157907, longitude: -70.68305797110348 },
        { latitude: 19.448002790292737, longitude: -70.68319423447959 },
        { latitude: 19.447952254385704, longitude: -70.68335728338681 },
        { latitude: 19.447859857568105, longitude: -70.68341736365214 },
        { latitude: 19.44764432722428, longitude: -70.68372257733957 },
        { latitude: 19.44733924334631, longitude: -70.68417142784945 },
        { latitude: 19.44707956254192, longitude: -70.68452301554316 },
        { latitude: 19.446628790415176, longitude: -70.68478145464195 },
        { latitude: 19.44567775957427, longitude: -70.6851974094779 },
        { latitude: 19.444903913842158, longitude: -70.68554229169173 },
        { latitude: 19.44396582225374, longitude: -70.68592505115448 },
        { latitude: 19.442875724336794, longitude: -70.68614195072999 },
        { latitude: 19.44251943620596, longitude: -70.68633586543159 },
        { latitude: 19.44235588522236, longitude: -70.68648343101034 },
        { latitude: 19.442175845593308, longitude: -70.68639936266716 },
        { latitude: 19.441977922918465, longitude: -70.68595422364771 },
        { latitude: 19.441655258916825, longitude: -70.68536048047434 },
        { latitude: 19.4412627839692, longitude: -70.6844877196986 },
      ],
      paradas: [
        {
          title: "Kiosko",
          location: {
            latitude: 19.441130936254897,
            longitude: -70.68420603781672,
          },
        },
        {
          title: "A3",
          location: {
            latitude: 19.440622722606555,
            longitude: -70.68200890412594,
          },
        },
        {
          title: "Talleres Ingenieria ",
          location: {
            latitude: 19.441907556432835,
            longitude: -70.6815231746255,
          },
        },
        {
          title: "Juan XXIII",
          location: {
            latitude: 19.442761691831635,
            longitude: -70.68100894579264,
          },
        },
        {
          title: "Edificio P",
          location: {
            latitude: 19.443356812753525,
            longitude: -70.68098552330036,
          },
        },
        {
          title: "Multiuso",
          location: {
            latitude: 19.44528073898698,
            longitude: -70.68192563406768,
          },
        },
        {
          title: "Gimnasio",
          location: {
            latitude: 19.44663527519887,
            longitude: -70.68247065442648,
          },
        },
        {
          title: "Edificio Postgrado",
          location: {
            latitude: 19.447272894804343,
            longitude: -70.68423446254555,
          },
        },
        {
          title: "Edificio TEP",
          location: {
            latitude: 19.444451391495562,
            longitude: -70.68570395807352,
          },
        },
        {
          title: "Puerta 2",
          location: {
            latitude: 19.442071884006722,
            longitude: -70.68618701060508,
          },
        },
      ],
    },
    {
      name: "Ruta B",
      colorRutas: "#0557DD",
      colorParadas:"#DD3A05",
      coordinates: [
        { latitude: 19.44222500856477, longitude: -70.68429382328625 },
        { latitude: 19.44225198380211, longitude: -70.68398626649508 },
        { latitude: 19.442910100626356, longitude: -70.68399545418181 },
        { latitude: 19.44275896441082, longitude: -70.68435189975715 },
        { latitude: 19.442842184418016, longitude: -70.68439892221666 },
        { latitude: 19.442952639759074, longitude: -70.68417474628805 },
        { latitude: 19.443225351566316, longitude: -70.68420014173314 },
        { latitude: 19.443226675219858, longitude: -70.68463172703409 },
        { latitude: 19.443068994535537, longitude: -70.68468394035659 },
        { latitude: 19.44306855822964, longitude: -70.68489560325456 },
        { latitude: 19.443190548421942, longitude: -70.68511335753274 },
        { latitude: 19.44321834436666, longitude: -70.6852613636009 },
        { latitude: 19.44318771201694, longitude: -70.6854579745503 },
        { latitude: 19.443148512969607, longitude: -70.68581079148598 },
        { latitude: 19.44316390995537, longitude: -70.68607491310746 },
        { latitude: 19.4428396700527, longitude: -70.68616165112833 },
        { latitude: 19.442667328023045, longitude: -70.68621989501477 },
        { latitude: 19.44249032193049, longitude: -70.68638705661155 },
        { latitude: 19.44239171074198, longitude: -70.68656785704002 },
        { latitude: 19.44234366098075, longitude: -70.68671420146174 },
        { latitude: 19.442338050638508, longitude: -70.68708449353802 },
        { latitude: 19.4440152608058, longitude: -70.68726837131925 },
        { latitude: 19.446609815081306, longitude: -70.6882592743525 },
        { latitude: 19.44709291604299, longitude: -70.68835496323916 },
        { latitude: 19.44746712795572, longitude: -70.68832754862792 },
        { latitude: 19.448016873297153, longitude: -70.68805631033001 },
        { latitude: 19.447950950593352, longitude: -70.68803087090298 },
        { latitude: 19.448539519133796, longitude: -70.68760496910566 },
        { latitude: 19.449342007375748, longitude: -70.6869445254624 },
        { latitude: 19.449565942113473, longitude: -70.68659968125053 },
        { latitude: 19.449550243729647, longitude: -70.6861989151259 },
        { latitude: 19.449288600141262, longitude: -70.68543343070945 },
        { latitude: 19.449148116709512, longitude: -70.6851727192675 },
        { latitude: 19.44894035025746, longitude: -70.68496604334248 },
        { latitude: 19.448821969788124, longitude: -70.68462998350103 },
        { latitude: 19.44871549903284, longitude: -70.68386922656825 },
        { latitude: 19.44856426641932, longitude: -70.68351565359194 },
        { latitude: 19.44840152733729, longitude: -70.68332319703126 },
        { latitude: 19.44818016326196, longitude: -70.68330675378645 },
        { latitude: 19.447859267484233, longitude: -70.68341513328221 },
        { latitude: 19.447462604701776, longitude: -70.6839224698081 },
        { latitude: 19.447094314042662, longitude: -70.68452302894607 },
        { latitude: 19.446431309108537, longitude: -70.68485959998583 },
        { latitude: 19.444047262165064, longitude: -70.68590609767934 },
        { latitude: 19.443066486405762, longitude: -70.68608364127864 },
        { latitude: 19.443164073049164, longitude: -70.68546426890222 },
        { latitude: 19.443204145406433, longitude: -70.6852595775964 },
        { latitude: 19.443165140485554, longitude: -70.68510721271362 },
        { latitude: 19.44304699682691, longitude: -70.68489651287946 },
        { latitude: 19.44281085419702, longitude: -70.68447963062818 },
        { latitude: 19.442813302164314, longitude: -70.68441516037136 },
        { latitude: 19.442762754970406, longitude: -70.68435659224035 },
        { latitude: 19.442230119888794, longitude: -70.68430849533716 },
      ],
      paradas: [
        {
          title: "Padre Arroyo",
          location: {
            latitude: 19.44222862019747,
            longitude: -70.68428346162727,
          },
        },
        {
          title: "Biblioteca",
          location: {
            latitude: 19.443263638824714,
            longitude: -70.68460948306587,
          },
        },
        {
          title: "Iglesia",
          location: {
            latitude: 19.443121035168765,
            longitude: -70.6860939374529,
          },
        },
        {
          title: "Square One",
          location: {
            latitude: 19.44263008838846,
            longitude: -70.68704627548072,
          },
        },
        {
          title: "Platino Hotel & Casino",
          location: {
            latitude: 19.44407704849566,
            longitude: -70.68721953794432,
          },
        },
        {
          title: "Elevado Autopista Duarte",
          location: {
            latitude: 19.44955842847829,
            longitude: -70.68616766552925,
          },
        },
        {
          title: "Puerta 1",
          location: {
            latitude: 19.448122910899666,
            longitude: -70.68335953549473,
          },
        },
      ],
    },
  ]);
});


module.exports = router;
