import axios from "axios";

// ここにコードを書きます
const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;
const GOOGLE_API_KEY = "AIzaSyBdtfl0NbtLJp2dDo2gQ9yU8axAVTSzg9g";

type GoogleGeocrdingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

// declareを使って'google'というプロパティは型チェックをしなくても良いことをTSに伝える
// declare var google: any;

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  // GoogleAPIに送信
  axios
    .get<GoogleGeocrdingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((response) => {
      console.log(response);
      if (response.data.status !== "OK") {
        throw new Error("座標を取得できませんでした。");
      }
      // ex. coordinates = {lat: -34.397, lng: 150.644}
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById("map")!, {
        center: coordinates,
        zoom: 16,
      });
      // マーカーの作成
      new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
}

form.addEventListener("submit", searchAddressHandler);
