modules.define(
    'complaint',
    ['i-bem__dom', 'jquery', 'BEMHTML'],
    function(provide, BEMDOM, $, BEMHTML) {

        provide(BEMDOM.decl(this.name, {

            /**
             * При наведении на статус - показываем,
             * предварительно скрыв все попапы.
             * При клике на статус переключаем видимость попапа.
             *
             * @param e
             * @returns {_onPointerClick}
             * @private
             */
            _onPointerClick: function(e) {
                var modal = this.findBlockInside('modal');

                modal.setMod('visible', true);

                return this;
            }

        }, {
            live: function() {

                this
                    .liveBindTo('button', 'pointerclick', function (e) {
                        this._onPointerClick(e);
                    });

            }
        }));
    }
);
