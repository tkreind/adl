/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as assert from 'assert';
import { readFile, writeFile, readdir, mkdir } from '@azure-tools/async-io';

const $example = `${__dirname}/../../../examples/prototype`;


/*
@suite class TestAPI {
  @test async 'Load Prototype ADL'() {
    const api = await new Api().load($example);
    await api.save('c:/tmp/sample1');

    console.log(api.ServiceName);
    console.log([...api.ApiVersions]);
    for (const resource of api.Resources) {
      console.log(`Resource Name: ${resource.Name}`);
      console.log(`Resource Type: ${resource.ResourceType}`);
    }

  }
}
*/