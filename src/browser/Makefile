all: voyanuionlinegame.swf

voyanuionlinegame.swf:
	printf '%s' 'Array(function(WIDTH, HEIGHT, MENU, LSO) {' > voyanuionlinegame.as
	cat ../shared/voyanuionlinegame.as >> voyanuionlinegame.as
	printf '\n%s' '})[0].call(this, 742, 556, true, false);' >> voyanuionlinegame.as
	makeswf \
		-c -1 \
		-v 8 \
		-s 742x556 \
		-r 20 \
		-b 000000 \
		-o voyanuionlinegame.main.swf \
		voyanuionlinegame.as
	swfcombine \
		-v \
		-z \
		-m \
		-l \
		-o voyanuionlinegame.swf \
		voyanuionlinegame.main.swf \
		-f 1=../shared/fonts/trademarker_light.swf \
		-f 1=../shared/fonts/gillsans.swf
	chmod -x voyanuionlinegame.swf
	rm voyanuionlinegame.as voyanuionlinegame.main.swf*
