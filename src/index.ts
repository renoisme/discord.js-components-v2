import { AttachmentBuilder, ButtonBuilder, ButtonStyle, Client, ContainerBuilder, Events, FileBuilder, GatewayIntentBits, MediaGalleryBuilder, MediaGalleryItemBuilder, Message, MessageFlags, SectionBuilder, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder, } from 'discord.js';

const client = new Client({
   intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
   ]
});

client.once(Events.ClientReady, (client: Client) => {
   console.log(`${client.user!.tag}`);
});

client.on(Events.MessageCreate, (message: Message) => {
   if (message.content === '!message') {

      const container = new ContainerBuilder();

      container.addMediaGalleryComponents(
         new MediaGalleryBuilder()
            .addItems(
               new MediaGalleryItemBuilder()
                  .setURL('https://media.discordapp.net/attachments/697138785317814292/1364347504702914602/docs-header.png?ex=680d4ba1&is=680bfa21&hm=a6f8164f0dccca3849522f3bbc658068f27430d580ddf7048f738de618244926&=&format=webp&quality=lossless')
            )
      );

      container.addTextDisplayComponents(
         new TextDisplayBuilder()
            .setContent("## Introducing New Components for Messages!\nWe're bringing new components to messages that you can use in your apps. They allow you to have full control over the layout of your messages.\n\nOur previous components system, while functional, had limitations:\n- Content, attachments, embeds, and components had to follow fixed positioning rules\n- Visual styling options were limited\n\nOur new component system addresses these challenges with fully composable components that can be arranged and laid out in any order, allowing for a more flexible and visually appealing design. Check out the [changelog](https://discord.com/developers/docs/change-log) for more details.")
      );

      container.addMediaGalleryComponents(
         new MediaGalleryBuilder()
            .addItems(
               new MediaGalleryItemBuilder()
                  .setURL('https://media.discordapp.net/attachments/697138785317814292/1364347505642569850/components-hero.png?ex=680d4ba1&is=680bfa21&hm=a0b8137fc1227d4795b279447f484d9850cb610c58cd72d0f4951f199f0150b5&=&format=webp&quality=lossless&width=1872&height=519'),
            )
      );

      container.addSectionComponents(
         new SectionBuilder()
            .addTextDisplayComponents(
               new TextDisplayBuilder()
                  .setContent("A brief overview of components:")
            )
            .setButtonAccessory(
               new ButtonBuilder()
                  .setLabel('Overview')
                  .setURL('https://discord.com/developers/docs/components/overview')
                  .setStyle(ButtonStyle.Link)
            ),
         new SectionBuilder()
            .addTextDisplayComponents(
               new TextDisplayBuilder()
                  .setContent("A brief overview of components:")
            )
            .setButtonAccessory(
               new ButtonBuilder()
                  .setLabel('Reference')
                  .setURL('https://discord.com/developers/docs/components/reference#what-is-a-component-component-types')
                  .setStyle(ButtonStyle.Link)
            ),
         new SectionBuilder()
            .addTextDisplayComponents(
               new TextDisplayBuilder()
                  .setContent("Get started with message components:")
            )
            .setButtonAccessory(
               new ButtonBuilder()
                  .setLabel('Guide')
                  .setURL('https://discord.com/developers/docs/components/using-message-components')
                  .setStyle(ButtonStyle.Link)
            ),
      );

      container.addSeparatorComponents(
         new SeparatorBuilder()
            .setDivider(true)
            .setSpacing(SeparatorSpacingSize.Small)
      );

      container.addTextDisplayComponents(
         new TextDisplayBuilder()
            .setContent("-# This message was composed using components, check out the request:")
      );

      const attachment = new AttachmentBuilder('./data.json')
         .setName('message-data.json');

      container.addFileComponents(
         new FileBuilder()
            .setURL('attachment://message-data.json')
      );

      message.reply({
         components: [container],
         files: [attachment],
         flags: MessageFlags.IsComponentsV2,
      });
   }
});

client.login(Bun.env.TOKEN);
