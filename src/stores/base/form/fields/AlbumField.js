import {STORE_TYPE} from "../../Store";
import Field, {FIELD_TYPE} from "./Field";

export default class AlbumField extends Field {
    static type = STORE_TYPE.SEQUENCED;
    static storeName = 'AlbumField';

    /**
     * @param {string} args.name - The name of the field
     * @param {string} [args.label = undefined] - The label of the field
     * @param {boolean} [args.required = true] - If the field is required, default is true
     * @param {string} [args.hint = undefined] - Hint for the field
     * @param {string} [args.className = undefined] - The root class of field_view
     * @param {function[]} [args.validators = [] ] - The array of field validators
     * @returns {Store} the created store
     */
    static create(args) {
        return super.create({...args, type: FIELD_TYPE.ALBUM});
    }

    getActions() {
        return [...super.getActions(), 'add_media', 'edit_media', 'delete_media'];
    }

    set_context(context) {
        if (context === undefined) {
            context = {medias: []};
        } else {
            context = {medias: [...context.medias]}
        }
        super.set_context(context);
    }

    add_media(new_media) {
        let medias = [...this.state.value.medias];
        let highest_order = -1;
        medias.forEach(media => {
            if (media.order > highest_order) {
                highest_order = media.order;
            }
        });
        new_media.order = highest_order + 1;
        medias.push(new_media);
        this.set_value({medias});
    }

    edit_media(edited_media) {
        let medias = [...this.state.value.medias];
        let insert_index = -1;
        medias.forEach((media, index) => {
            if (media.order === edited_media.order) {
                insert_index = index;
            }
        });
        medias[insert_index] = edited_media;
        this.set_value({medias});
    }

    delete_media(deleted_media) {
        let medias = [...this.state.value.medias];
        let delete_index = -1;
        medias.forEach((media, index) => {
            if (media.order === deleted_media.order) {
                delete_index = index;
            }
        });
        medias.splice(delete_index, 1);
        this.set_value({medias});
    }
}
