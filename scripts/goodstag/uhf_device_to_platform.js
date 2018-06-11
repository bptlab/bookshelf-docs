var readPlan = new SimpleReadPlan([1], TagProtocol.GEN2);
Log.info("Reader: " + Reader.paramGet("/reader/version/model"));
Reader.paramSet("/reader/read/plan", readPlan)
Reader.paramSet("/reader/radio/readPower", 2200);

Reader.loop(function () {
    var tags = Reader.read(1000);
    for (var i = 0; i < tags.length; i++) {
        var tag = tags[i];
        Log.debug("EPC: " + tag.epcString());
        EventQueue.add({
            "type": "device.tag.detect",
            "data": {
                "epc": tag.epcString(),
                "type": "epc"
            }
        });
        
    }
    
})

function sleep(duration) {
    var now = new Date().getTime();
    while (new Date().getTime() < now + duration) { /* do nothing */ }
}