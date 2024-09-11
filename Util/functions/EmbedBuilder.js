const { EmbedBuilder } = require(`discord.js`);

class Embed {
    constructor() {
        this.embed = new EmbedBuilder();
    }

    setTitle(title) {
        if (!title || typeof title !== 'string') throw new Error('[Embed] Title must be a non-empty string');
        this.embed.setTitle(title);
        return this;
    }

    setDescription(description) {
        if (!description || typeof description !== 'string') throw new Error('[Embed] Description must be a non-empty string');
        this.embed.setDescription(description);
        return this;
    }

    setColor(color) {
        this.embed.setColor(color);
        return this;
    }

    setFooter(footer) {
        this.embed.setFooter(footer);
        return this;
    }
    setAuthor(author) {
        this.embed.setAuthor(author);
        return this;
    }

    setImage (image) {
        this.embed.setImage(image)
        return this;
    }

    setThumbnail(thumbnail) {
        this.embed.setThumbnail(thumbnail);
        return this;
    }

    addField(name, value, inline = false) {
        if (!name || typeof name !== 'string') throw new Error('[Embed] Field name must be a non-empty string');
        if (!value || typeof value !== 'string') throw new Error('[Embed] Field value must be a non-empty string');
        this.embed.addFields({ name, value, inline });
        return this;
    }

    addFields(fields) {
        if (!Array.isArray(fields)) throw new Error('[Embed] Fields must be an array');
        fields.forEach(field => {
            if (!field.name || typeof field.name !== 'string') throw new Error('[Embed] Field name must be a non-empty string');
            if (!field.value || typeof field.value !== 'string') throw new Error('[Embed] Field value must be a non-empty string');
        });
        this.embed.addFields(fields);
        return this;
    }

    build() {
        return this.embed;
    }
}

module.exports = { Embed };