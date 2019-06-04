#!/usr/bin/env node
'use strict';

const usb = require('usb');

usb.getDeviceList().some((dev, i) => {
    if (dev.deviceDescriptor.idVendor === 0x0403) {
        dev.open();
        const iSerialNumber = dev.deviceDescriptor.iSerialNumber;
        dev.getStringDescriptor(iSerialNumber, (err, buf) => {
            console.log(i, buf);

            const if0 = dev.interfaces[0];
            if (if0.isKernelDriverActive()) {
		if(parseInt(buf) != NaN && parseInt(buf) < 9999) {
                    if0.detachKernelDriver();
                    console.log('detached');
		}
		else {
		    console.log('Not detached');
		}
            }
            dev.close();
        });
    }
});
