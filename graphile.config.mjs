// @ts-check
import { makePgService } from "@dataplan/pg/adaptors/pg";
import { PostGraphileAmberPreset } from "postgraphile/presets/amber";
import { PgSimplifyInflectionPreset } from "@graphile/simplify-inflection";

/** @satisfies {GraphileConfig.Preset} */
const preset = {
  extends: [
    PostGraphileAmberPreset,
    PgSimplifyInflectionPreset,
  ],
  pgServices: [
    makePgService({
      // Database connection string:
      connectionString: process.env.DATABASE_URL,
      superuserConnectionString:
        process.env.SUPERUSER_DATABASE_URL ?? process.env.DATABASE_URL,
      // List of schemas to expose:
      schemas: process.env.DATABASE_SCHEMAS?.split(",") ?? ["public"],
      // Enable LISTEN/NOTIFY:
      pubsub: true
    })
  ],
  gather: {
		pgStrictFunctions: true,
	},
  grafserv: {
    port: 5678,
    websockets: true,
    allowUnpersistedOperation: true,
    watch: true,
  },
  grafast: {
    explain: true,
  }
};

export default preset;
