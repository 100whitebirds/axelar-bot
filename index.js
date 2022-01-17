const TelegramApi = require('node-telegram-bot-api')
const greetingMessageEng = require('./messages/greetingMessageEng')
const greetingMessageRus = require('./messages/greetingMessageRus')
const quantumMessageEng = require('./messages/quantum/quantumMessageEng')
const quantumMessageRus = require('./messages/quantum/quantumMessageRus')
const aboutAxelarMessageEng = require('./messages/axelar/about/aboutAxelarMessageEng')
const aboutAxelarMessageRus = require('./messages/axelar/about/aboutAxelarMessageRus')
const videosMessageEng = require('./messages/axelar/videos/videosMessageEng')
const videosMessageRus = require('./messages/axelar/videos/videosMessageRus')
const articlesMessageEng = require('./messages/axelar/articles/articlesMessageEng')
const articlesMessageRus = require('./messages/axelar/articles/articlesMessageRus')
const channelsMessageEng = require('./messages/axelar/channels/channelsMessageEng')
const channelsMessageRus = require('./messages/axelar/channels/channelsMessageRus')
const contactsMessageEng = require('./messages/axelar/contacts/contactsMessageEng')
const contactsMessageRus = require('./messages/axelar/contacts/contactsMessageRus')
const fundsMessageEng= require('./messages/axelar/funds/fundsMessageEng')
const fundsMessageRus = require('./messages/axelar/funds/fundsMessageRus')
const dotenv = require('dotenv').config()

const token = process.env.TOKEN
const port = process.env.PORT || 8448
const host = process.env.HOST
const externalUrl = process.env.URL || 'https://axelarbot.herokuapp.com/'

const roadmapEng = __dirname + '/assets/ROADMAP-ENG.png'
const roadmapRus = __dirname + '/assets/ROADMAP-RUS.png'
const backers = __dirname + '/assets/BACKERS.jpeg'

var usersLang = ''
var subscribedUsers = []

const bot = new TelegramApi(token, {polling: true}, {webHook: {port: port, host: host}})
bot.setWebHook(externalUrl + ':8448/bot' + token)

bot.setMyCommands([
  {command: '/start', description: 'greeting'},
])


const start = () => {
  //lang
  languageOptions = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: 'English', callback_data: 'eng' }],
        [{ text: 'Русский', callback_data: 'rus' }],
      ]
    })
  }
  //1st step 
  topicOptionsEng = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: 'About Axelar', callback_data: 'aboutAxelar' }],
        [{ text: 'Quantum community program', callback_data: 'quantum' }],
        [{ text: 'For developers', callback_data: 'dev' }],
        [{ text: 'Whitepaper', url: 'https://axelar.network/wp-content/uploads/2021/07/axelar_whitepaper.pdf' }],
        [{ text: 'Subscribe for notifications', callback_data: 'notifications' }],
        [{ text: '🌐 Change language', callback_data: 'backtoLang' }],
      ]
    })
  }
  topicOptionsRus = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: 'Об Axelar', callback_data: 'aboutAxelar' }],
        [{ text: 'Программа для коммюнити "Quantum"', callback_data: 'quantum' }],
        [{ text: 'Разработчикам', callback_data: 'dev' }],
        [{ text: 'Whitepaper', url: 'https://axelar.network/wp-content/uploads/2021/07/axelar_whitepaper.pdf' }],
        [{ text: 'Подписаться на уведомления', callback_data: 'notifications' }],
        [{ text: '🌐 Выбрать другой язык', callback_data: 'backtoLang' }],
      ]
    })
  }
    //2nd step
    aboutAxelarOptionsEng = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: 'Articles', callback_data: 'articles' }],
          [{ text: 'Telegram channels', callback_data: 'channels' }],
          [{ text: 'Videos', callback_data: 'videos' }],
          [{ text: 'Backers', callback_data: 'funds' }],
          [{ text: 'Roadmap', callback_data: 'roadmap' }],
          [{ text: 'Contacts', callback_data: 'contacts' }],
          [{ text: 'How to get involved?', callback_data: 'hotoget' }],
          [{ text: '⬅️ Back', callback_data: 'backtoMainMenu' }],
        ]
      })
    }
    aboutAxelarOptionsRus = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: 'Статьи', callback_data: 'articles' }],
          [{ text: 'Telegram каналы', callback_data: 'channels' }],
          [{ text: 'Видео', callback_data: 'videos' }],
          [{ text: 'Фонды', callback_data: 'funds' }],
          [{ text: 'Roadmap', callback_data: 'roadmap' }],
          [{ text: 'Контакты', callback_data: 'contacts' }],
          [{ text: 'Как я могу поучаствовать в проекте?', callback_data: 'hotoget' }],
          [{ text: '⬅️ Назад', callback_data: 'backtoMainMenu' }],
        ]
      })
    }
      //3d step 
      goBackToAboutAxelarOptionsEng = {
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [{ text: '⬅️ Back', callback_data: 'backtoAboutAxelar' }],
          ]
        })
      }
      goBackToAboutAxelarOptionsRus = {
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [{ text: '⬅️ Back', callback_data: 'backtoAboutAxelar' }],
          ]
        })
      }
    videosOptionsEng = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: 'Axelar Guest Speaker Series with Mary Maller', url: 'https://www.youtube.com/watch?v=BrYzinXGLkc' }],
          [{ text: 'Axelar Community Call - January 12, 2022', url: 'https://www.youtube.com/watch?v=OC3fl4COXog' }],
          [{ text: 'Axelar Testnet AMA', url: 'https://www.youtube.com/watch?v=9EBCZJk1aTA' }],
          [{ text: 'Axelar Testnet Validator Info Session & AMA ', url: 'https://www.youtube.com/watch?v=IQaPXQzryEU' }],
          [{ text: 'Axelar AMA', url: 'https://www.youtube.com/watch?v=fDfPHxZi9Fg' }],
          [{ text: '⬅️ Back', callback_data: 'backtoAboutAxelar' }],
        ]
      })
    }
    videosOptionsRus = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: 'Axelar Guest Speaker Series with Mary Maller', url: 'https://www.youtube.com/watch?v=BrYzinXGLkc' }],
          [{ text: 'Axelar Community Call - January 12, 2022', url: 'https://www.youtube.com/watch?v=OC3fl4COXog' }],
          [{ text: 'Axelar Testnet AMA', url: 'https://www.youtube.com/watch?v=9EBCZJk1aTA' }],
          [{ text: 'Axelar Testnet Validator Info Session & AMA ', url: 'https://www.youtube.com/watch?v=IQaPXQzryEU' }],
          [{ text: 'Axelar AMA', url: 'https://www.youtube.com/watch?v=fDfPHxZi9Fg' }],
          [{ text: '⬅️ Назад', callback_data: 'backtoAboutAxelar' }],
        ]
      })
    }
    contactsOptionsEng = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: 'Axelar Website', url: 'https://axelar.network' }],
          [{ text: 'Twitter', url: 'https://twitter.com/axelarcore' }],
          [{ text: 'Youtube', url: 'https://www.youtube.com/channel/UCf8GFg58fdp1iZwLAOV1Tgg' }],
          [{ text: 'Medium', url: 'https://medium.com/axelar' }],
          [{ text: 'Telegram Announcements', url: 'https://t.me/axelarnetwork' }],
          [{ text: 'Telegram Community', url: 'https://t.me/axelarcommunity' }],
          [{ text: 'Developer Discord', url: 'https://discord.com/invite/aRZ3Ra6f7D' }],
          [{ text: '⬅️ Back', callback_data: 'backtoAboutAxelar' }],
        ]
      })
    }
    contactsOptionsRus = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: 'Axelar Website', url: 'https://axelar.network' }],
          [{ text: 'Twitter', url: 'https://twitter.com/axelarcore' }],
          [{ text: 'Youtube', url: 'https://www.youtube.com/channel/UCf8GFg58fdp1iZwLAOV1Tgg' }],
          [{ text: 'Medium', url: 'https://medium.com/axelar' }],
          [{ text: 'Telegram проекта', url: 'https://t.me/axelarnetwork' }],
          [{ text: 'Telegram сообщества', url: 'https://t.me/axelarcommunity' }],
          [{ text: 'Discord', url: 'https://discord.com/invite/aRZ3Ra6f7D' }],
          [{ text: '⬅️ Назад', callback_data: 'backtoAboutAxelar' }],
        ]
      })
    }
    articlesOptionsEng = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: 'Introducing Axelar Network', url: 'https://medium.com/axelar/introducing-axelar-network-45fccea94730' }],
          [{ text: 'A Technical Introduction to the Axelar Network', url: 'https://axelar.network/a-technical-introduction-to-the-axelar-network' }],
          [{ text: 'Axelar Newsletter — Mainnet Rollout Announcement', url: 'https://medium.com/axelar/axelar-newsletter-mainnet-rollout-begins-announcement-f8957d93a6ae' }],
          [{ text: 'Axelar Newsletter — December Edition', url: 'https://medium.com/axelar/axelar-newsletter-december-edition-bcb93cf331c0' }],
          [{ text: 'Axelar Launches Line of Exclusive Community NFTs', url: 'https://medium.com/axelar/axelar-launches-line-of-exclusive-community-nfts-a375d32dbde2' }],
          [{ text: 'Axelar Open-Sources Multi-Party Cryptography Libraries', url: 'https://medium.com/axelar/axelar-open-sources-multi-party-cryptography-libraries-b6addfe040b4' }],
          [{ text: 'Axelar Careers', url: 'https://axelar.network/careers' }],
          [{ text: '⬅️ Back', callback_data: 'backtoAboutAxelar' }],
        ]
      })
    }      
    articlesOptionsRus = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: 'Introducing Axelar Network', url: 'https://medium.com/axelar/introducing-axelar-network-45fccea94730' }],
          [{ text: 'A Technical Introduction to the Axelar Network', url: 'https://axelar.network/a-technical-introduction-to-the-axelar-network' }],
          [{ text: 'Axelar Newsletter — Mainnet Rollout Announcement', url: 'https://medium.com/axelar/axelar-newsletter-mainnet-rollout-begins-announcement-f8957d93a6ae' }],
          [{ text: 'Axelar Newsletter — December Edition', url: 'https://medium.com/axelar/axelar-newsletter-december-edition-bcb93cf331c0' }],
          [{ text: 'Axelar Launches Line of Exclusive Community NFTs', url: 'https://medium.com/axelar/axelar-launches-line-of-exclusive-community-nfts-a375d32dbde2' }],
          [{ text: 'Axelar Open-Sources Multi-Party Cryptography Libraries', url: 'https://medium.com/axelar/axelar-open-sources-multi-party-cryptography-libraries-b6addfe040b4' }],
          [{ text: 'Axelar Careers', url: 'https://axelar.network/careers' }],
          [{ text: '⬅️ Назад', callback_data: 'backtoAboutAxelar' }],
        ]
      })
    }
    howtogetOptionsEng = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: 'Incentivized Quantum Community Program', url: 'https://medium.com/axelar/axelar-announces-the-launch-of-their-incentivized-quantum-community-program-f8e2d01fd970' }],
          [{ text: 'Incentivized Testnet', url: 'https://axelar.network/axelar-network-opens-registration-for-its-incentivized-testnet' }],
          [{ text: 'Ecosystem Developer Opportunities', url: 'https://axelar.knack.com/axelar-forms#ecosystem-dev-details' }],
          [{ text: 'Axelar Careers', url: 'https://axelar.network/careers' }],
          [{ text: '⬅️ Back', callback_data: 'backtoAboutAxelar' }],
        ]
      })
    }
    howtogetOptionsRus = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: 'Программа Quantum Community', url: 'https://medium.com/axelar/axelar-announces-the-launch-of-their-incentivized-quantum-community-program-f8e2d01fd970' }],
          [{ text: 'Участие в Testnet', url: 'https://axelar.network/axelar-network-opens-registration-for-its-incentivized-testnet' }],
          [{ text: 'Возможности экосистемы для разработчиков', url: 'https://axelar.knack.com/axelar-forms#ecosystem-dev-details' }],
          [{ text: 'Карьера в Axelar', url: 'https://axelar.network/careers' }],
          [{ text: '⬅️ Назад', callback_data: 'backtoAboutAxelar' }],
        ]
      })
    }


  quantumOptionsEng = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: 'Guide', callback_data: 'guide' }],
        [{ text: 'FAQ', callback_data: 'faq' }],
        [{ text: 'Summary', callback_data: 'summary' }],
        [{ text: '⬅️ Back', callback_data: 'backtoMainMenu' }],
      ]
    })
  }

  quantumOptionsRus = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: 'Руководство', callback_data: 'guide' }],
        [{ text: 'FAQ', callback_data: 'faq' }],
        [{ text: 'Summary', callback_data: 'summary' }],
        [{ text: '⬅️ Назад', callback_data: 'backtoMainMenu' }],
      ]
    })
  }

  devOptionsEng = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: 'Incentivized Testnet', url: 'https://axelar.network/axelar-network-opens-registration-for-its-incentivized-testnet' }],
        [{ text: 'Ecosystem Developer Opportunities', url: 'https://axelar.knack.com/axelar-forms#ecosystem-dev-details' }],
        [{ text: 'Axelar Careers', url: 'https://axelar.network/careers' }],
        [{ text: '⬅️ Back', callback_data: 'backtoMainMenu' }],
      ]
    })
  }

  devOptionsRus = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: 'Участие в Testnet', url: 'https://axelar.network/axelar-network-opens-registration-for-its-incentivized-testnet' }],
        [{ text: 'Ecosystem Developer Opportunities', url: 'https://axelar.knack.com/axelar-forms#ecosystem-dev-details' }],
        [{ text: 'Карьера в Axelar', url: 'https://axelar.network/careers' }],
        [{ text: '⬅️ Назад', callback_data: 'backtoMainMenu' }],
      ]
    })
  }

  testnetOptionsEng = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: 'Information', callback_data: 'testnetInfo' }],
        [{ text: 'Guide', callback_data: 'testnetGuide' }],
        [{ text: '⬅️ Back', callback_data: 'backtoMainMenu' }],
      ]
    })
  }

  testnetOptionsRus = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: 'Информация', callback_data: 'testnetInfo' }],
        [{ text: 'Гайд', callback_data: 'testnetGuide' }],
        [{ text: '⬅️ Назад', callback_data: 'backtoMainMenu' }],
      ]
    })
  }


  //Start Message
  bot.on('message', msg => {
    const text = msg.text
    const chatId = msg.chat.id
    if (text === '/start') {
      return bot.sendMessage(
        chatId, `Choose language`, languageOptions)
    }
    if (text.includes('42')) {
      subscribedUsers.forEach(userCharId => {
        return bot.sendMessage(
          userCharId, `${text}`)
      })
    }
    return bot.sendMessage(chatId, 'Invalid command')
  })

  //Button Replies
  bot.on('callback_query', function onCallbackQuery(msg) {
    const chatId = msg.message.chat.id
    if (msg.data === 'backtoLang') {
      return bot.sendMessage(chatId, `Choose language`, languageOptions)
    }
    //Main Menu
    if (msg.data === 'backtoMainMenu' && usersLang === 'eng') {
      return bot.sendMessage(chatId, greetingMessageEng(msg.from.first_name), topicOptionsEng)
    }
    if (msg.data === 'backtoMainMenu' && usersLang === 'rus') {
      return bot.sendMessage(chatId, greetingMessageRus(msg.from.first_name), topicOptionsRus)
    }
    if (msg.data === 'eng') {
      usersLang = 'eng'
      return bot.sendMessage(chatId, greetingMessageEng(msg.from.first_name), topicOptionsEng)
    }
    if (msg.data === 'rus') {
      usersLang = 'rus'
      return bot.sendMessage(chatId, greetingMessageRus(msg.from.first_name), topicOptionsRus)
    }

    //1 step
    if (msg.data === 'aboutAxelar' || msg.data === 'backtoAboutAxelar') {
      if (usersLang === 'eng') {
        return bot.sendMessage(chatId, aboutAxelarMessageEng(), aboutAxelarOptionsEng)
      }
      if (usersLang === 'rus') {
        return bot.sendMessage(chatId, aboutAxelarMessageRus(), aboutAxelarOptionsRus)
      }
    } 
      //2 step
        if (msg.data === 'funds') {
          if (usersLang === 'eng') {
            bot.sendMessage(chatId, fundsMessageEng())
            return bot.sendPhoto(chatId, backers, goBackToAboutAxelarOptionsEng)
          }
          if (usersLang === 'rus') {
            bot.sendMessage(chatId, fundsMessageRus())
            return bot.sendPhoto(chatId, backers, goBackToAboutAxelarOptionsRus)
          }
        }
        if (msg.data === 'articles') {
          if (usersLang === 'eng') {
            return bot.sendMessage(chatId, articlesMessageEng(), articlesOptionsEng)
          }
          if (usersLang === 'rus') {
            return bot.sendMessage(chatId, articlesMessageRus(), articlesOptionsRus)
          }
        } 
        if (msg.data === 'videos') {
          if (usersLang === 'eng') {
            return bot.sendMessage(chatId, videosMessageEng(), videosOptionsEng)
          }
          if (usersLang === 'rus') {
            return bot.sendMessage(chatId, videosMessageRus(), videosOptionsRus)
          }
        } 
        if (msg.data === 'contacts') {
          if (usersLang === 'eng') {
            return bot.sendMessage(chatId, contactsMessageEng(), contactsOptionsEng)
          }
          if (usersLang === 'rus') {
            return bot.sendMessage(chatId, contactsMessageRus(), contactsOptionsRus)
          }
        }
        if (msg.data === 'channels') {
          if (usersLang === 'eng') {
            return bot.sendMessage(chatId, channelsMessageEng(), goBackToAboutAxelarOptionsEng)
          }
          if (usersLang === 'rus') {
            return bot.sendMessage(chatId, channelsMessageRus(), goBackToAboutAxelarOptionsRus)
          }
        }
        if (msg.data === 'hotoget') {
          if (usersLang === 'eng') {
            return bot.sendMessage(chatId, 'There are some options!', howtogetOptionsEng)
          }
          if (usersLang === 'rus') {
            return bot.sendMessage(chatId, 'Есть несколько вариантов!', howtogetOptionsRus)
          }
        }
        if (msg.data === 'roadmap') {
          if (usersLang === 'eng') {
            return bot.sendPhoto(chatId, roadmapEng, goBackToAboutAxelarOptionsEng)
          }
          if (usersLang === 'rus') {
            return bot.sendPhoto(chatId, roadmapRus, goBackToAboutAxelarOptionsRus)
          }
        }

    if (msg.data === 'quantum') {
      if (usersLang === 'eng') {
        const message = quantumMessageEng()
        return bot.sendMessage(chatId, `${message}`, quantumOptionsEng)
      }
      if (usersLang === 'rus') {
        return bot.sendMessage(chatId, quantumMessageRus(), quantumOptionsRus)
      }
    } 
    //2 step
        if (msg.data === 'guide') {
          const guideMessageEng = 'guide'
          const guideMessageRus = 'Про guide'
          if (usersLang === 'eng') {
            return bot.sendMessage(chatId, guideMessageEng)
          }
          if (usersLang === 'rus') {
            return bot.sendMessage(chatId, guideMessageRus)
          }
        } if (msg.data === 'faq') {
          const faqMessageEng = 'faq'
          const faqMessageRus = 'faq'
          if (usersLang === 'eng') {
            return bot.sendMessage(chatId, faqMessageEng)
          }
          if (usersLang === 'rus') {
            return bot.sendMessage(chatId, faqMessageRus)
          }
        } if (msg.data === 'summary') {
          const summaryMessageEng = 'summary'
          const summaryMessageRus = 'summary'
          if (usersLang === 'eng') {
            return bot.sendMessage(chatId, summaryMessageEng)
          }
          if (usersLang === 'rus') {
            return bot.sendMessage(chatId, summaryMessageRus)
          }
        }

    if (msg.data === 'dev') {
      const forDevsEng = 'These are some options for developers 🧑🏻‍💻'
      const forDevsRus = 'Возможности для разработчиков 🧑🏻‍💻'
      if (usersLang === 'eng') {
        return bot.sendMessage(chatId, forDevsEng, devOptionsEng)
      }
      if (usersLang === 'rus') {
        return bot.sendMessage(chatId, forDevsRus, devOptionsRus)
      }
    } 
    //2 step
        if (msg.data === 'docs') {
          const docsMessageEng = 'docs'
          const docsMessageRus = 'docs'
          if (usersLang === 'eng') {
            return bot.sendMessage(chatId, docsMessageEng)
          }
          if (usersLang === 'rus') {
            return bot.sendMessage(chatId, docsMessageRus)
          }
        }
        if (msg.data === '????') {
          const docsMessageEng = 'docs'
          const docsMessageRus = 'docs'
          if (usersLang === 'eng') {
            return bot.sendMessage(chatId, docsMessageEng)
          }
          if (usersLang === 'rus') {
            return bot.sendMessage(chatId, docsMessageRus)
          }
        }

    if (msg.data === 'testnet') {
      const testnetMessageEng = 'about Testnet'
      const testnetMessageRus = 'про Testnet'
      var forDevsEng = 'For developers'
      var forDevsRus = 'Для разработчиков'
      if (usersLang === 'eng') {
        return bot.sendMessage(chatId, testnetMessageEng, testnetOptionsEng)
      }
      if (usersLang === 'rus') {
        return bot.sendMessage(chatId, testnetMessageRus, testnetOptionsRus)
      }
    } 
    //2 step
        if (msg.data === 'testnetInfo') {
          const testnetInfoMessageEng = 'testnetInfo'
          const testnetInfoMessageRus = 'testnetInfo'
          var forDevsEng = 'For developers'
          var forDevsRus = 'Для разработчиков'
          if (usersLang === 'eng') {
            return bot.sendMessage(chatId, testnetInfoMessageEng)
          }
          if (usersLang === 'rus') {
            return bot.sendMessage(chatId, testnetInfoMessageRus)
          }
        } if (msg.data === 'testnetGuide') {
          const testnetGuideMessageEng = 'testnetGuide'
          const testnetGuideMessageRus = 'testnetGuide'
          var forDevsEng = 'For developers'
          var forDevsRus = 'Для разработчиков'
          if (usersLang === 'eng') {
            return bot.sendMessage(chatId, testnetGuideMessageEng)
          }
          if (usersLang === 'rus') {
            return bot.sendMessage(chatId, testnetGuideMessageRus)
          }
        }

    if (msg.data === 'notifications') {
      if (usersLang === 'eng') {
        subscribedUsers.push(chatId)
        return bot.sendMessage(chatId, `You've successfully subscribed to Axelar announcements!`)
      }
      if (usersLang === 'rus') {
        subscribedUsers.push(chatId)
        return bot.sendMessage(chatId, `Вы успешно подписались на рассылку Axelar!`)
      }
    } 
  })
}

start()