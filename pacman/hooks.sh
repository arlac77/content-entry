
pre_install() {
	useradd -U -l -M -r -s /usr/bin/nologin -d /var/lib/content-entry -G http -c "content entries for content containers (aka files)" content-entry
}

post_install() {
	systemctl daemon-reload
	systemctl enable content-entry
	systemctl enable content-entry.socket
	systemctl start content-entry.socket
}

pre_upgrade() {
	systemctl stop content-entry.socket
	systemctl stop content-entry
}

post_upgrade() {
	systemctl daemon-reload
	systemctl start content-entry.socket
}

pre_remove() {
	systemctl stop content-entry.socket
	systemctl disable content-entry.socket
	systemctl stop content-entry
	systemctl disable content-entry
}

post_remove() {
	systemctl daemon-reload
	userdel content-entry
	groupdel content-entry
}
