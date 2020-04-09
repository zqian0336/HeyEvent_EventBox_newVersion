(function () {
    var user_id = '1111';
    let user_fullname = 'Zhicheng Qian';
    var lng = -122.08;
    var lat = 37.38;
    let api_key = 'AIzaSyA8GsStak4k4m98J5F9rxXJi3RPuY-MrqY';

    init();


    function geocode(e) {
        e.preventDefault();

        var location = document.getElementById("location-input").value;
        // var location = 'Seattle';

        axios.get('https://maps.googleapis.com/maps/api/geocode/json?', {
            params: {
                address: location,
                key: api_key
            }
        })
            .then(function(response){

                // lat = response.data.results[0].geometry.location.lat;
                // lng = response.data.results[0].geometry.location.lng;
                var array = response.data.results[0];
                if(!array || array.length == 0) {
                    showWarningMessage('No nearby item.');
                    $("cur-loc").innerText = "Cannot find the location :( ";
                }else{
                    lat = array.geometry.location.lat;
                    lng = array.geometry.location.lng;
                    $("cur-loc").innerText = "Location: "+array.formatted_address;
                }



                loadNearbyItems()

            })
            .catch(function (error) {
                console.log(error);
                showErrorMessage('Cannot load nearby items.');
                $("cur-loc").innerText = "Cannot find the location :("

            });

    }

    function reverseGeo(e){
        // https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
        axios.get('https://maps.googleapis.com/maps/api/geocode/json?', {
            params: {
                latlng: lat + ',' + lng,
                key: api_key
            }
        })
            .then(function(response){
                var array = response.data.results;
                if(!array || array.length == 0) {
                    $("cur-loc").innerText = "Cannot get your current location :("
                }else{
                    $("cur-loc").innerText = "Current Location: "+array[6].formatted_address;
                }

                loadNearbyItems()

            })
            .catch(function (error) {
                console.log(error);
                showErrorMessage('Cannot load nearby items.');

            });

    }

    function init() {
        $('nearby-btn').addEventListener('click', loadNearbyItems);
        $('fav-btn').addEventListener('click', loadFavoriteItems);
        $('recommend-btn').addEventListener('click', loadRecommendedItems);
        $('location-form').addEventListener('submit', geocode);



        let welcomeMsg = document.getElementById("welcome-msg");
        welcomeMsg.innerText = 'Welcome, ' + user_fullname;

        $("cur-loc").innerText = 'Current Location: ';

        initGeoLocation();
    }

    //Helper Function that creates a DOM element
    function $(tag, options) {
        if (!options) {
            return document.getElementById(tag);
        }
        var element = document.createElement(tag);

        for (var option in options) {
            if (options.hasOwnProperty(option)) {
                element[option] = options[option];
            }
        }
        return element;
    }

    function hideElement(element) {
        element.style.display = 'none';
    }

    function showElement(element, style) {
        var displayStyle = style ? style : 'block';
        element.style.display = displayStyle;
    }

    //AJAX
    function ajax(method, url, data, callback, errorHandler) {
        var xhr = new XMLHttpRequest(); //ajax object [xhr负责前后端数据通信]
        xhr.open(method, url, true); //传递方法,目的地址
        xhr.onload = function () {  //xhr本身运行正常，判断response
            if (xhr.status == 200) {
                callback(xhr.responseText);
            } else if (xhr.status === 403) {
                onSessionInvalid();
            } else {
                errorHandler();
            }
        };

        xhr.onerror = function () { //if error on xhr itself[request]
            console.error("Cannot complete Request ");
            errorHandler();
        };

        if (data === null) { //没有内容，直接传递 [对收到数据的处理]
            xhr.send();
        } else {
            xhr.setRequestHeader("Content-Type", "application/json:charset=utf-8");
            xhr.send(data);
        }
    }

    function initGeoLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onPositionUpdated, onLoadPositionFailed, {maximumAge: 60000});
            showLoadingMessage("Retrieving your location");
        } else {
            onLoadPositionFailed();
        }
    }

    function onPositionUpdated(position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;


        // $("cur-loc").innerText = 'Current Location: ';

        reverseGeo();


        // loadNearbyItems();
    }

    function onLoadPositionFailed() {
        console.warn('navigator.geolocation is not available');

        getLocationFromIP();
    }

    function getLocationFromIP() {
        // Get location from http://ipinfo.io/json
        var url = 'http://ipinfo.io/json';
        var req = null;
        ajax('GET', url, req, function (res) {
            var result = JSON.parse(res);
            if ('loc' in result) {
                var loc = result.loc.split(',');
                lat = loc[0];
                lng = loc[1];
            } else {
                console.warn('Getting location by IP failed.');
            }
            loadNearbyItems();
        });
    }

    function loadNearbyItems() {
        console.log('loadNearbyItems');
        activeBtn('nearby-btn');

        // The request parameters
        var url = './search';
        var params = 'user_id=' + user_id + '&lat=' + lat + '&lon=' + lng;
        var req = JSON.stringify({});

        // display loading message
        showLoadingMessage('Loading nearby items...');
        //============================ajax======
        // make AJAX call !!!!!!!
        ajax('GET', url + '?' + params, req,
            // successful callback
            function (res) {
                var items = JSON.parse(res);
                if (!items || items.length === 0) {
                    showWarningMessage('No nearby item.');
                } else {
                    listItems(items);
                }
            },
            // failed callback
            function () {
                showErrorMessage('Cannot load nearby items.');
            });
        //===============
    }

    function loadFavoriteItems() {
//		console.log('loadFavoriteItems');
        activeBtn('fav-btn');

        // The request parameters
        var url = './history';
        var params = 'user_id=' + user_id;
        var req = JSON.stringify({});

        // display loading message
        showLoadingMessage('Loading favorite items...');
        //============================ajax======
        // make AJAX call !!!!!!!
        ajax('GET', url + '?' + params, req,
            // successful callback
            function (res) {
                var items = JSON.parse(res);
                if (!items || items.length === 0) {
                    showWarningMessage('No favorite item.');
                } else {
                    listItems(items);
                }
            },
            // failed callback
            function () {
                showErrorMessage('Cannot load favorite items.');
            });
        //===============
    }

    function loadRecommendedItems() {
        activeBtn('recommend-btn');

        // The request parameters
        var url = './recommendation';
        var params = 'user_id=' + user_id + '&lat=' + lat + '&lon=' + lng;
        var req = JSON.stringify({});

        // display loading message
        showLoadingMessage('Loading recommended items...');
        //============================ajax======
        // make AJAX call !!!!!!!
        ajax('GET', url + '?' + params, req,
            // successful callback
            function (res) {
                var items = JSON.parse(res);
                if (!items || items.length === 0) {
                    showWarningMessage('No recommended item.');
                } else {
                    listItems(items);
                }
            },
            // failed callback
            function () {
                showErrorMessage('Cannot load recommended items.');
            });

    }

    //toggle favorite Item [POST + DELETE]
    function changeFavoriteItem(item_id) {
        var li = $('item-' + item_id);
        var favIcon = $('fav-icon-' + item_id);
        var favorite = li.dataset.favorite !== 'true';

        var url = './history';
        var req = JSON.stringify({
            user_id: user_id,
            favorite: [item_id]
        });
        var method = favorite ? 'POST' : 'DELETE';
        ajax(method, url, req, function (res) {
            var result = JSON.parse(res);
            if (result.result === 'SUCCESS') {
                li.dataset.favorite = favorite;
                favIcon.className = favorite ? 'fa fa-heart' : 'fa fa-heart-o';
            }
        });
    }


    //=============================Helper===

    //navigation button active
    function activeBtn(btnId) {
        var btns = document.getElementsByClassName('main-nav-btn');

        // deactivate all navigation buttons
        for (var i = 0; i < btns.length; i++) {
            btns[i].className = btns[i].className.replace(/\bactive\b/, '');
        }

        // active the one that has id = btnId
        var btn = $(btnId);
        btn.className += ' active';
    }

    function showLoadingMessage(msg) {
        var itemList = $('item-list');
        itemList.innerHTML = '<p class="notice"><i class="fa fa-spinner fa-spin"></i> '
            + msg + '</p>';
    }

    //Warning message
    function showWarningMessage(msg) {
        var itemList = $('item-list');
        itemList.innerHTML = '<p class="notice"><i class="fa fa-exclamation-triangle"></i> '
            + msg + '</p>';
    }

    function showErrorMessage(msg) {
        var itemList = $('item-list');
        itemList.innerHTML = '<p class="notice"><i class="fa fa-exclamation-circle"></i> '
            + msg + '</p>';
    }

//	============
    //List the items
    function listItems(items) {
        var itemList = $('item-list');
        itemList.innerHTML = '';


        for (var i = 0; i < items.length; i++) {
            addItem(itemList, items[i]);
        }
    }


    //!! Add Items
    function addItem(itemList, item) {
        var item_id = item.item_id;

        var li = $('li', {
            id: 'item-' + item_id,
            className: 'item'
        });

        // set the data attribute 
        li.dataset.item_id = item_id;
        li.dataset.favorite = item.favorite;

        // item image
        if (item.image_url) {
            li.appendChild($('img', {
                src: item.image_url
            }));
        } else {
            li.appendChild($('img', {
                src: 'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png'
            }))
        }
        // section
        var section = $('div', {});

        // title
        var title = $('a', {
            href: item.url,
            target: '_blank',
            className: 'item-name'
        });
        title.innerHTML = item.name;
        section.appendChild(title);



        // category
        var category = $('p', {
            className: 'item-category'
        });
        category.innerHTML = 'Category: ' + item.categories.join(', ');
        section.appendChild(category);

        var stars = $('div', {
            className: 'stars'
        });

        for (var i = 0; i < item.rating; i++) {
            var star = $('i', {
                className: 'fa fa-star'
            });
            stars.appendChild(star);
        }

        if (('' + item.rating).match(/\.5$/)) {
            stars.appendChild($('i', {
                className: 'fa fa-star-half-o'
            }));
        }

        section.appendChild(stars);

        li.appendChild(section);



        // address
        var address = $('p', {
            className: 'item-address'
        });

        address.innerHTML = item.address.replace(/,/g, '<br/>').replace(/\"/g,
            '');
        li.appendChild(address);

        // favorite link
        var favLink = $('p', {
            className: 'fav-link'
        });

        favLink.onclick = function () {
            changeFavoriteItem(item_id);
        };

        favLink.appendChild($('i', {
            id: 'fav-icon-' + item_id,
            className: item.favorite ? 'fa fa-heart' : 'fa fa-heart-o'
        }));

        li.appendChild(favLink);


        var link = $('a', {
            href: item.url,
            target: '_blank',
            className: 'item-link btn btn-sm btn-outline-light'
        });
        // link.classList.add('');
        link.innerHTML = 'Get Ticket !';
        li.appendChild(link);

        itemList.appendChild(li);
    }

})();