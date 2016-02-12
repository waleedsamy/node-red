/**
 * Copyright 2016 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {
    "use strict";

    function LinkInNode(n) {
        RED.nodes.createNode(this,n);
        var node = this;

        if (n.event) {
            var handler = function(msg) {
                node.receive(msg);
            }
            RED.events.on("node:"+n.event,handler);
            this.on("input", function(msg) {
                this.send(msg);
            });
            this.on("close",function() {
                RED.events.removeListener("node:"+n.event,handler);
            })
        }
    }

    RED.nodes.registerType("link in",LinkInNode);

    function LinkOutNode(n) {
        RED.nodes.createNode(this,n);
        var node = this;
        if (n.event) {
            this.on("input", function(msg) {
                RED.events.emit("node:"+n.event,msg)
            });
        }
    }
    RED.nodes.registerType("link out",LinkOutNode);
}
