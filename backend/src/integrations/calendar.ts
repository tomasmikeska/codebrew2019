const ics = require('ics')
const { writeFileSync } = require('fs')
const nodemailer = require('nodemailer');

module.exports = {
    async sendMailWithCalendarEntry() {
        const event = {
            start: [2019, 11, 11, 7, 0],
            duration: { hours: 1, minutes: 30 },
            title: 'Dentist',
            description: 'Dentist',
            location: 'Mojmírovo nám. 2919/22, 612 00 Brno-Královo Pole',
            categories: ['personal'],
            status: 'CONFIRMED',
            busyStatus: 'BUSY',
            organizer: { name: 'Jakub Kriz', email: 'jakub.kriz@artin.cz' },
            attendees: [
                { name: 'Jakub Kriz', email: 'jakub.kriz@artin.cz', partstat: 'ACCEPTED', role: 'REQ-PARTICIPANT' }
            ]
        }
        ics.createEvent(event, (error: any, value: any) => {
            if (error) {
                console.log(error)
                return
            }
            writeFileSync(`${__dirname}/event.ics`, value)
        })

        let transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER, // generated ethereal user
                pass: process.env.EMAIL_PASS // generated ethereal password
            }
        });

        // send mail with defined transport object
        try {
            let info = await transporter.sendMail({
                from: '"Your digital assistant 🤖" <jakub.kriz@artin.cz>',
                to: 'jakub.kriz@artin.cz',
                subject: 'New Appointment 🤖',
                text: "Hey Jakub,\n\nI'm sending you an appointment that you wanted me to create.\n\nAdd it to your calendar if you want.\n\nYour assistant",
                attachments: [{ path: `${__dirname}/event.ics` }]
            });
        } catch (exc) {
            console.error(exc)
        }
    }
}