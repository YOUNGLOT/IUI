var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(37.49461890613009, 127.02760319558533), // 지도의 중심좌표 37.49461890613009, 127.02760319558533
        level: 5 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption),
    // 닫을 수 있는 인포윈도우 객체 생성
    infowindow = new kakao.maps.InfoWindow({zIndex: 1});

map.setDraggable(false);
map.setZoomable(false);

// 지도에 마커와 인포윈도우를 표시하는 함수입니다
function displayMarker(locPosition, message) {

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map,
        position: locPosition
    });

    var iwContent = message // 인포윈도우에 표시할 내용

    // 인포윈도우를 생성합니다
    // var infowindow2 = new kakao.maps.InfoWindow({
    //     content : iwContent
    // });
    infowindow.setContent(iwContent);

    // 인포윈도우를 마커위에 표시합니다
    infowindow.open(map, marker);

    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);
}
var locPosition = '';
var message = '';
function getGeoLocation() {
    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {

        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function(position) {

            var lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도

            locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                message = '<div style="padding:0px 0px 0px 13px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

            // 마커와 인포윈도우를 표시합니다
            displayMarker(locPosition, message);

        });

    } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

        locPosition = new kakao.maps.LatLng(37.49461890613009, 127.02760319558533),
            message = 'geolocation을 사용할수 없어요..'

        displayMarker(locPosition, message);
    }
}
window.addEventListener("load", getGeoLocation);
// window.addEventListener("resize", getGeoLocation);
window.onresize = function (event) {
    if (locPosition) {
        displayMarker(locPosition, message);
    }
}