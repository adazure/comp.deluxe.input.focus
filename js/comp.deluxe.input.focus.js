/*
        ADAZURE INTERACTIVE
        Deluxe Input - www.adazure.com web sitesi altında yayınlanmaktadır.
        Bu framework Kerem YAVUZ tarafından kodlanmıştır. 
*/

var AdazureInteractive = (window.AdazureInteractive || {});

AdazureInteractive = (function (element) {

    var deluxe = (function () {

        function deluxe(allInputSelect, timer) {

            deluxe.allinputselect = allInputSelect ? allInputSelect : false;
            deluxe.timer = timer ? !isNaN(timer) ? timer : 10 : 10;
            return deluxe;
        }

        deluxe.init = function () {

            //Tüm input nesneleri seç
            var data = Array.prototype.slice.call(document.getElementsByTagName('input'));
            var textarea = Array.prototype.slice.call(document.getElementsByTagName('textarea'));
            
            data = data.concat(textarea);

            //En az 1 input nesnesi olmak zorunda
            if (data.length > 0) {

                //Her bir input nesnesini tek tek işle
                for (var q = 0; q < data.length; q++) {

                    //Deluxe constructor parametre değeri true ise tüm input nesnelerini işleme al
                    if (deluxe.allinputselect) {
                        deluxe_format(data[q]);
                    }
                        //Yalnızca data-deluxe özelliği olanları işleme al. data-deluxe özellği value değeri olmayabilir.
                        //Value değeri boş gelebileceğinden null ve undefined (tanımsız) özelliği yoksa bir data-deluxe özelliği var demektir, değilse zaten hiç olmamıştır. 
                    else if (data[q].getAttribute('data-deluxe') != null && data[q].getAttribute('data-deluxe') != undefined) {

                        //İşleme alınan sıradaki input nesnesini al
                        deluxe_format(data[q]);

                    }

                }

            }

            function deluxe_format(_this) {

                //Eklenecek olan span nesnesi için, span nesnesinin ekleneceği bir üst katmanı çağır
                var parent = _this.parentNode;

                //Span nesnesini oluştur
                var nx = document.createElement('span');

                //Span nesnesine ait kontrol edebileceğimiz sınıf değerlerini ata
                nx.className = "deluxe-rel-cnt";

                //Oluşturulan sınıf nesnesi içerisine bir span değeri daha atayıp içerisine placeholder içerisindeki veriyi yazalım                   
                nx.innerHTML = '<span class="deluxe-place-holder">' + _this.placeholder + '</span>';

                //Oluşturulan span nesnesi içerisine işlem yapılan input nesnesini taşıyalım. Kısaca wrap(sarmalama) yapmış olduk. <span><input ... </span>
                nx.appendChild(_this);

                //Oluştulan span nesnesinide daha önce seçilen bir üst katman içerisine tekrar aktar. 
                parent.insertBefore(nx, parent.childNodes[0]);

                //Placeholder verisini ayrı bir özellik içinde tutalım
                _this.setAttribute('data-placeholder', _this.getAttribute('placeholder'));

                //İlgili input nesnesine focus/blur özelliği ekle
                _this.onfocus = function (e) {

                    //İlgili input nesnesi kapsayan <span nesnesine deluxe-focus/deluxe-blur sınıflarını atar.
                    e.target.parentNode.classList.add('deluxe-focus');
                    e.target.parentNode.classList.remove('deluxe-blur');
                    _this.placeholderFocusAndBlur(true);
                }

                _this.onblur = function (e) {
                    //İlgili input nesnesi kapsayan <span nesnesine deluxe-focus/deluxe-blur sınıflarını atar.
                    e.target.parentNode.classList.remove('deluxe-focus');
                    e.target.parentNode.classList.add('deluxe-blur');
                    _this.placeholderFocusAndBlur(false);
                }

                //Placeholder da yapılacak animasyon için timer nesnesi
                _this.timer = 0;

                //Focus ve blur için tetiklenecek olan ve sonrasında placeholder içeriğinin azaltılması ve arttırılması işlemini yapacak method
                //Direction parametresi ile true(focus) blur(false) değerleri gönderilecek
                _this.placeholderFocusAndBlur = function (direction) {

                    //Varsa önceki timerı durdur
                    clearInterval(_this.timer);
                    //işlem yapılan input nesnesinin o anki placeholder verisi
                    var _text = _this.getAttribute('placeholder');
                    var z = _this.getAttribute('data-placeholder');

                    //Animasyonu başlat
                    _this.timer = setInterval(function () {

                        //Focus
                        if (direction) {
                            _text = _text.length > 1 ? _text.substring(0, _text.length - 1) : "";
                        }
                            //Blur
                        else {
                            _text = _text.length <= z.length - 1 ? z.substring(0, _text.length + 1) : z;
                        }

                        _this.setAttribute('placeholder', _text);
                        //Eğer hiç karakter kalmamışsa ilgili timer nesnesini durdur
                        if (_text.length == 0 || _text.length == z.length) {
                            clearInterval(_this.timer);
                        }

                    }, deluxe.timer);

                }

            }

        }


        return deluxe;

    })();

    element.deluxe = deluxe;
    

    if(window.addEventListener)
        window.addEventListener('load',new element.deluxe().init,false);
    else
        window.attachEvent('onload',new element.deluxe().init);
    

    return element;

})(AdazureInteractive);

