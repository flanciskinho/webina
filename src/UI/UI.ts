// This file is part of Webina, released under the Apache 2.0 License. See
// LICENSE.md or go to https://opensource.org/licenses/Apache-2.0 for full
// details. Copyright 2023 Jacob D. Durrant.


import * as Utils from "../Utils";
import { VERSION } from "../Version";
import { store } from "../Vue/Store";

declare let Vue: any;

/**
 * Setup the main Vue app.
 * @returns void
 */
export function setup(): void {
    new Vue({
        "el": '#app',
        "store": store,
        "template": `
            <div class="container-fluid">

                <b-navbar toggleable="lg" type="dark" variant="dark" class="mb-3">
                    <b-navbar-brand href="#">webina ${VERSION}</b-navbar-brand>

                    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                    <b-collapse id="nav-collapse" is-nav>
                        <b-navbar-nav>
                            <b-nav-item href="#">Home</b-nav-item>
                            <b-nav-item href="https://interreg-sudoe.eu/proyecto-interreg/repo-sudoe/" target="_blank">More Info</b-nav-item>
                        </b-navbar-nav>
                    </b-collapse>
                </b-navbar>

                <open-modal></open-modal>
                <convert-file-modal></convert-file-modal>
                <draw-smiles-modal></draw-smiles-modal>
                <div id="no-mobile">
                    <b-jumbotron class="jumbo" header="Webina ${VERSION}" lead="AutoDock Vina Ported to WebAssembly">
                        <p>Webina ${VERSION} is not designed to work on mobile phones. Please use a device with a larger screen.</p>
                    </b-jumbotron>
                </div>

<!--
                <b-jumbotron class="jumbo" style="background-image:url(${Utils.logosPath()}webina_logo.jpg);" header="Webina ${VERSION}" lead="AutoDock Vina Ported to WebAssembly">
                    <p>Brought to you by the <a target="_blank" href="http://durrantlab.com">Durrant Lab</a>.</p>
                    <b-button variant="primary" target="_blank" href="http://durrantlab.com">More Info</b-button>
                </b-jumbotron>
-->
                <b-card no-body class="mb-3">
                    <b-tabs v-model="tabIdx" card fill pills vertical content-class="mt-3"> <!-- vertical -->
                        <b-tab title="Input Parameters" active :disabled="parametersTabDisabled">
                            <b-card-text>
                                <vina-params></vina-params>
                            </b-card-text>
                        </b-tab>
                        <b-tab title="Existing Vina Output" :disabled="existingVinaOutputTabDisabled">
                            <b-card-text>
                                <vina-existing-output></vina-existing-output>
                            </b-card-text>
                        </b-tab>
                        <b-tab title="Running Webina" :disabled="runningTabDisabled">
                            <b-card-text>
                                <vina-running></vina-running>
                            </b-card-text>
                        </b-tab>
                        <b-tab title="Output" :disabled="outputTabDisabled">
                            <b-card-text>
                                <vina-output></vina-output>
                            </b-card-text>
                        </b-tab>
                        <b-tab title="Start Over" :disabled="startOverTabDisabled">
                            <b-card-text>
                                <start-over></start-over>
                            </b-card-text>
                        </b-tab>
                    </b-tabs>
                </b-card>



                <b-container fluid id="footer">
                    <b-row align-v="center">
                        <b-col>
                            <b-img fluid src="${Utils.logosPath()}cbmn-logo.png" alt="cbmn"></b-img>
                        </b-col>
                        <b-col>
                            <b-img fluid src="${Utils.logosPath()}citic-logo.png" alt="CITIC"></b-img>
                        </b-col>
                        <b-col>
                            <b-img fluid src="${Utils.logosPath()}cnrs-logo.png" alt="CNR"></b-img>
                        </b-col>
                        <b-col>
                            <b-img fluid src="${Utils.logosPath()}csg-logo.png" alt="CSG"></b-img>
                        </b-col>
                        <b-col>
                            <b-img fluid src="${Utils.logosPath()}interreg_sudoe-logo.png" alt="Interreg Sudoe"></b-img>
                        </b-col>
                        <b-col>
                            <b-img fluid src="${Utils.logosPath()}mduse-logo.png" alt="mduse"></b-img>
                        </b-col>
                        <b-col>
                            <b-img fluid src="${Utils.logosPath()}spsp-logo.png" alt="spsp"></b-img>
                        </b-col>
                        <b-col>
                            <b-img fluid src="${Utils.logosPath()}udc-logo.png" alt="UDC"></b-img>
                        </b-col>
                        <b-col>
                            <b-img fluid src="${Utils.logosPath()}usc-logo.png" alt="USC"></b-img>
                        </b-col>
                    </b-row>
                </b-container>
            </div>

        `,

        /**
         * Get the data associated with this component.
         * @returns any  The data.
         */
        "data"() {
            return {
                "receptorFile": false,
                "ligandFile": false
            }
        },
        "computed": {
            /** Gets and sets the tabIdx. */
            "tabIdx": {
                get(): number {
                    return store.state["tabIdx"];
                },

                set(val: number): void {
                    store.commit("setVar", {
                        name: "tabIdx",
                        val: val
                    });
                }
            },

            /**
             * Determine whether the parameters tab is disabled.
             * @returns boolean  True if it is disabled, false otherwise.
             */
            "parametersTabDisabled"(): boolean {
                return store.state["parametersTabDisabled"];
            },

            /**
             * Determine whether the running tab is disabled.
             * @returns boolean  True if it is disabled, false otherwise.
             */
            "runningTabDisabled"(): boolean {
                return store.state["runningTabDisabled"];
            },

            /**
             * Determine whether the output tab is disabled.
             * @returns boolean  True if it is disabled, false otherwise.
             */
            "outputTabDisabled"(): boolean {
                return store.state["outputTabDisabled"];
            },

            /**
             * Determine whether the existing vina output tab is disabled.
             * @returns boolean  True if it is disabled, false otherwise.
             */
            "existingVinaOutputTabDisabled"(): boolean {
                return store.state["existingVinaOutputTabDisabled"];
            },

            /**
             * Determine whether the start over tab is disabled.
             * @returns boolean  True if it is disabled, false otherwise.
             */
            "startOverTabDisabled"(): boolean {
                return store.state["startOverTabDisabled"];
            }
        },

        "methods": {},

        /**
         * Runs when the vue component is mounted.
         * @returns void
         */
        "mounted"() {
            // (<any>window)["$store"] = store;  // For debugging
        }
    })
}
