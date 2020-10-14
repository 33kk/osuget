#!/bin/sh
DIR=$(dirname "$(readlink -f "$0")")

"$DIR"/http-handler/setup.sh

echo
echo Installing osuget...

echo Creating directories...
mkdir -p ~/.local/bin ~/.local/share/applications ~/.config/osuget

echo Linking files...
ln -sf "$DIR/osuget" ~/.local/bin
ln -sf "$DIR/osuget.desktop" ~/.local/share/applications

echo Creating default config...

[ ! -f ~/.config/osuget/config ] && cat > ~/.config/osuget/config << EOF
OSU_COOKIE="Cookie: osu_session=x"
OSU_GAMEDIR="~/Games/osu/drive_c/osu/Songs/"
EOF

cat << EOF

For browser integration:
- Add osuget.user.js to your browser with userscript manager (violentmonkey/greasemonkey/tampermonkey)
- Set osuget as protocol handler for osuget protocol
  Firefox:
  - Open about:config
  - Add network.protocol-handler.expose.osuget preference with boolean type
  - Set value to "false"
  Chromium:
  - idk

Edit ~/.config/osuget/config to set your osu session cookie
EOF

