const { ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

class Button {
    constructor() {
        this.button = new ButtonBuilder();
    }

    setStyle(style) {
        if (typeof style === 'string') {
            const buttonStyle = ButtonStyle[style.toUpperCase()];
            // if (!buttonStyle) throw new Error(`[ButtonBuilder] Invalid button style: ${style}`);
            this.button.setStyle(buttonStyle);
        } else {
            this.button.setStyle(style);
        }
        return this;
    }

    setLabel(label) {
        if (!label || typeof label !== 'string') throw new Error('[ButtonBuilder] Label must be a non-empty string');
        this.button.setLabel(label);
        return this;
    }

    setURL(url) {
        if (!url || typeof url !== 'string') throw new Error('[ButtonBuilder] URL must be a non-empty string');
        this.button.setURL(url);
        return this;
    }

    setCustomId(id) {
        if (!id || typeof id !== 'string') throw new Error('[ButtonBuilder] Custom ID must be a non-empty string');
        this.button.setCustomId(id);
        return this;
    }

    setEmoji(emoji) {
        if (!emoji) throw new Error('[ButtonBuilder] Emoji must be provided');
        this.button.setEmoji(emoji);
        return this;
    }

    setDisabled(disabled) {
        this.button.setDisabled(!!disabled);
        return this;
    }

    validateButton() {
        if (!this.button.data.style) throw new Error('[ButtonBuilder] Style is required');
        if (!this.button.data.label) throw new Error('[ButtonBuilder] Label is required');
        if (this.button.data.style === ButtonStyle.Link) {
            if (!this.button.data.url) throw new Error('[ButtonBuilder] URL is required for Link buttons');
        } else {
            if (!this.button.data.custom_id) throw new Error('[ButtonBuilder] Custom ID is required for non-Link buttons');
        }
    }

    build() {
        this.validateButton();
        return new ActionRowBuilder().addComponents(this.button);
    }
}

module.exports = { Button };
