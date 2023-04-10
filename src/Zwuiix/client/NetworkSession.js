const get = (packetName) => require(`../packets/${packetName}.json`);

class NetworkSession
{
    client;

    constructor(client)
    {
        this.client=client;
        this.start();
    }

    start()
    {
        this.client.getBedrockClient().write('resource_packs_info', {must_accept: false, has_scripts: false, behaviour_packs: [], texture_packs: []});
        this.client.getBedrockClient().write('resource_pack_stack', {must_accept: false, behavior_packs: [], resource_packs: [], game_version: '', experiments: [], experiments_previously_used: false});
        this.client.getBedrockClient().once('resource_pack_client_response', async () => {
            this.client.getBedrockClient().write('network_settings', {compression_threshold: 1});
            this.packets();
            this.spawn();
            this.tick();
        });
    }

    packets()
    {
        this.client.getBedrockClient().queue('player_list', get('player_list'))
        this.client.getBedrockClient().queue('start_game', get('start_game'))
        this.client.getBedrockClient().queue('item_component', {entries: []})
        this.client.getBedrockClient().queue('set_time', {time: 5433771})
        this.client.getBedrockClient().queue('set_difficulty', {difficulty: 1})
        this.client.getBedrockClient().queue('set_commands_enabled', {enabled: true})
        this.client.getBedrockClient().queue('update_adventure_settings', get('update_adventure_settings'))
        this.client.getBedrockClient().queue('biome_definition_list', get('biome_definition_list'))
        this.client.getBedrockClient().queue('available_entity_identifiers', get('available_entity_identifiers'))
        this.client.getBedrockClient().queue('update_attributes', get('update_attributes'))
        this.client.getBedrockClient().queue('creative_content', get('creative_content'))
        this.client.getBedrockClient().queue('inventory_content', get('inventory_content'))
        this.client.getBedrockClient().queue('player_hotbar', {selected_slot: 3, window_id: 'inventory', select_slot: true})
        this.client.getBedrockClient().queue('crafting_data', get('crafting_data'))
        this.client.getBedrockClient().queue('available_commands', get('available_commands'))
        this.client.getBedrockClient().queue('chunk_radius_update', {chunk_radius: 1})
        this.client.getBedrockClient().queue('game_rules_changed', get('game_rules_changed'))
    }

    spawn()
    {
        setTimeout(() => {
            this.client.getBedrockClient().write('play_status', {status: 'player_spawn'});
            this.client.onSpawn();
        }, 6000);
    }

    tick()
    {
        this.client.getBedrockClient().on('tick_sync', (packet) => {
            this.client.getBedrockClient().queue('tick_sync', {
                request_time: packet.request_time,
                response_time: BigInt(Date.now())
            })
        })
    }
}
module.exports = NetworkSession;